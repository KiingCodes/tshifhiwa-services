import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const BOOKINGS_INBOX = "bookings@tshifhiwa-services.co.za";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BookingRequest {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  serviceCategory?: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 255;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!RESEND_API_KEY) throw new Error("Email service is not configured");

    const booking: BookingRequest = await req.json();

    const required: (keyof BookingRequest)[] = [
      "name",
      "email",
      "phone",
      "serviceType",
      "service",
      "preferredDate",
      "preferredTime",
    ];
    for (const field of required) {
      const value = booking[field];
      if (typeof value !== "string" || value.trim().length === 0) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
    if (!isValidEmail(booking.email.trim())) {
      throw new Error("Invalid email address");
    }
    if (booking.name.length > 100 || booking.phone.length > 20) {
      throw new Error("Input exceeds allowed length");
    }
    if (booking.message && booking.message.length > 1000) {
      throw new Error("Message is too long");
    }

    const category =
      booking.serviceCategory ??
      booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1);

    const row = (label: string, value: string) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#475569;font-size:14px;width:40%;">${escapeHtml(label)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid #e2e8f0;color:#0F172A;font-size:14px;font-weight:600;">${escapeHtml(value)}</td>
      </tr>`;

    const emailHtml = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:24px;background:#F8FAFC;font-family:Inter,Arial,sans-serif;">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;">
      <div style="background:#0F4C3A;padding:28px 24px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;">New Booking Request</h1>
        <p style="margin:6px 0 0;color:#D97706;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Tshifhiwa Plumbing &amp; Electrical Services</p>
      </div>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Customer Name", booking.name)}
        ${row("Email", booking.email)}
        ${row("Phone", booking.phone)}
        ${row("Service Category", category)}
        ${row("Specific Service", booking.service)}
        ${row("Preferred Date", booking.preferredDate)}
        ${row("Preferred Time", booking.preferredTime)}
        ${booking.message ? row("Additional Details", booking.message) : ""}
      </table>
      <div style="background:#F8FAFC;padding:18px 24px;color:#475569;font-size:12px;">
        Please respond to this booking within 24 hours.
      </div>
    </div>
  </body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tshifhiwa Bookings <onboarding@resend.dev>",
        to: [BOOKINGS_INBOX],
        subject: `New Booking: ${booking.service} — ${booking.name}`,
        html: emailHtml,
        reply_to: booking.email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error(`Resend API error [${res.status}]: ${errorData}`);
      throw new Error("Failed to send booking email");
    }

    const data = await res.json();
    console.log("Booking email sent:", data?.id);

    return new Response(JSON.stringify({ success: true, id: data?.id }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected error";
    console.error("Error in send-booking function:", message);
    return new Response(JSON.stringify({ success: false, error: message }), {
      status: 400,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
};

serve(handler);
