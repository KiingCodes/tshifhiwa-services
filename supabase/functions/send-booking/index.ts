import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

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
  service: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const booking: BookingRequest = await req.json();
    console.log("Received booking request:", booking);

    // Validate required fields
    if (!booking.name || !booking.email || !booking.phone || !booking.serviceType || !booking.service || !booking.preferredDate || !booking.preferredTime) {
      throw new Error("Missing required fields");
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #166534; }
            .value { margin-top: 5px; }
            .footer { background: #166534; color: white; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🔧 New Booking Request</h1>
              <p style="margin: 10px 0 0;">Tshifhiwa Plumbing & Electrical</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Customer Name</div>
                <div class="value">${booking.name}</div>
              </div>
              <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">${booking.email}</div>
              </div>
              <div class="field">
                <div class="label">📱 Phone</div>
                <div class="value">${booking.phone}</div>
              </div>
              <div class="field">
                <div class="label">${booking.serviceType === 'plumbing' ? '🔧' : '⚡'} Service Type</div>
                <div class="value">${booking.serviceType.charAt(0).toUpperCase() + booking.serviceType.slice(1)}</div>
              </div>
              <div class="field">
                <div class="label">🛠️ Specific Service</div>
                <div class="value">${booking.service}</div>
              </div>
              <div class="field">
                <div class="label">📅 Preferred Date</div>
                <div class="value">${booking.preferredDate}</div>
              </div>
              <div class="field">
                <div class="label">🕐 Preferred Time</div>
                <div class="value">${booking.preferredTime}</div>
              </div>
              ${booking.message ? `
              <div class="field">
                <div class="label">💬 Additional Details</div>
                <div class="value">${booking.message}</div>
              </div>
              ` : ''}
            </div>
            <div class="footer">
              <p style="margin: 0;">Please respond to this booking within 24 hours.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Tshifhiwa Bookings <onboarding@resend.dev>",
        to: ["nedaneh@outlook.com"],
        subject: `New Booking: ${booking.service} - ${booking.name}`,
        html: emailHtml,
        reply_to: booking.email,
      }),
    });

    if (!res.ok) {
      const errorData = await res.text();
      console.error("Resend API error:", errorData);
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
