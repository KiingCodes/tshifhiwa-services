import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MessageSquare,
  Wrench,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  ListChecks,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255, "Email is too long"),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number")
    .max(20, "Phone number is too long")
    .regex(/^[0-9+()\s-]+$/, "Phone can only contain digits and + ( ) -"),
  serviceType: z.string().min(1, "Please select a service category"),
  service: z.string().min(1, "Please select a specific service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time slot"),
  message: z.string().trim().max(1000, "Message is too long").optional(),
});

const serviceCatalog: Record<
  string,
  { label: string; icon: typeof Wrench; services: string[] }
> = {
  electrical: {
    label: "Electrical",
    icon: Zap,
    services: [
      "DB Board Installation & Upgrades",
      "Lighting & Ceiling Fans",
      "Power Points & Sockets",
      "Battery & Inverter / Solar Backup",
      "Fault Finding & Repairs",
      "Certificate of Compliance (COC)",
    ],
  },
  plumbing: {
    label: "Plumbing",
    icon: Wrench,
    services: [
      "Leak Detection & Pipe Repair",
      "Geyser Installation & Repair",
      "Bathroom & Kitchen Plumbing",
      "Unblocking Drains",
      "General Maintenance",
    ],
  },
  electronics: {
    label: "Electronics & Security",
    icon: ShieldCheck,
    services: [
      "CCTV Security Systems",
      "Gate Motors & Automation",
      "Electric Fencing Setup & Repair",
      "Access Control Systems",
      "Intercom Systems",
    ],
  },
};

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "Emergency (After Hours)",
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  serviceType: "",
  service: "",
  preferredDate: "",
  preferredTime: "",
  message: "",
};

const fieldClass = (hasError: boolean) =>
  `pl-10 h-12 rounded-xl bg-background border-border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-green/40 focus-visible:border-green ${
    hasError ? "border-destructive focus-visible:ring-destructive/30" : ""
  }`;

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: formRef, isVisible: formVisible } = useScrollAnimation(0.1);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const result = bookingSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) newErrors[err.path[0] as string] = err.message;
      });
      setErrors(newErrors);
      toast({
        title: "Please check the form",
        description: "Some required details are missing or invalid.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const { data, error } = await supabase.functions.invoke("send-booking", {
        body: {
          ...result.data,
          serviceCategory: serviceCatalog[result.data.serviceType]?.label,
        },
      });
      if (error) throw new Error(error.message || "Failed to submit booking");
      if (!data?.success)
        throw new Error(data?.error || "Failed to submit booking");
      setIsSuccess(true);
      setFormData(emptyForm);
    } catch (error) {
      toast({
        title: "Booking could not be sent",
        description:
          error instanceof Error
            ? error.message
            : "Something went wrong. Please call us on +27 83 212 0479.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const category = serviceCatalog[formData.serviceType];
  const serviceOptions = category?.services ?? [];

  return (
    <section id="booking" className="bg-muted py-24">
      <div className="container mx-auto px-4">
        <div
          ref={headerRef}
          className={`mb-12 text-center transition-all duration-700 ${headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <span className="inline-block rounded-full border border-amber/30 bg-amber/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-amber">
            Get Started
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-foreground md:text-5xl">
            Book a <span className="text-gradient-green">Service</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Tell us what you need and we'll confirm your appointment within 24
            hours.
          </p>
        </div>

        <div
          ref={formRef}
          className={`transition-all duration-700 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
          style={{ transitionDelay: "200ms" }}
        >
          {isSuccess ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-green/20 bg-card p-10 text-center shadow-elevated">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green/10">
                <CheckCircle2 className="h-10 w-10 text-green" />
              </div>
              <h3 className="font-display text-2xl font-extrabold text-foreground md:text-3xl">
                Booking Request Received
              </h3>
              <p className="mx-auto mt-3 max-w-md text-muted-foreground">
                Thank you for choosing Tshifhiwa. A qualified technician will
                confirm your appointment within 24 hours.
              </p>
              <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
                {[
                  "Licensed & insured team",
                  "Transparent pricing",
                  "Workmanship guaranteed",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-3 text-sm text-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild variant="green" size="lg">
                  <a href="tel:+27832120479">Call +27 83 212 0479</a>
                </Button>
                <Button
                  variant="outlineGreen"
                  size="lg"
                  onClick={() => setIsSuccess(false)}
                >
                  Make another booking
                </Button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-elevated md:p-10"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green" />
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className={fieldClass(!!errors.name)}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={fieldClass(!!errors.email)}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 83 000 0000"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      className={fieldClass(!!errors.phone)}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label className="text-foreground">Service Category *</Label>
                  <div className="relative">
                    {category ? (
                      <category.icon className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-green" />
                    ) : (
                      <ListChecks className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-green" />
                    )}
                    <Select
                      value={formData.serviceType}
                      onValueChange={(value) => {
                        handleChange("serviceType", value);
                        handleChange("service", "");
                      }}
                    >
                      <SelectTrigger className={fieldClass(!!errors.serviceType)}>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {Object.entries(serviceCatalog).map(([key, cat]) => (
                          <SelectItem key={key} value={key}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.serviceType && (
                    <p className="text-sm text-destructive">
                      {errors.serviceType}
                    </p>
                  )}
                </div>

                {/* Specific service */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-foreground">Specific Service *</Label>
                  <div className="relative">
                    <MessageSquare className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-green" />
                    <Select
                      value={formData.service}
                      onValueChange={(value) => handleChange("service", value)}
                      disabled={!formData.serviceType}
                    >
                      <SelectTrigger className={fieldClass(!!errors.service)}>
                        <SelectValue
                          placeholder={
                            formData.serviceType
                              ? "Select a service"
                              : "Select a category first"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {serviceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.service && (
                    <p className="text-sm text-destructive">{errors.service}</p>
                  )}
                </div>

                {/* Date */}
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-foreground">
                    Preferred Date *
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green" />
                    <Input
                      id="date"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.preferredDate}
                      onChange={(e) =>
                        handleChange("preferredDate", e.target.value)
                      }
                      className={fieldClass(!!errors.preferredDate)}
                    />
                  </div>
                  {errors.preferredDate && (
                    <p className="text-sm text-destructive">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label className="text-foreground">Preferred Time *</Label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-green" />
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) =>
                        handleChange("preferredTime", value)
                      }
                    >
                      <SelectTrigger
                        className={fieldClass(!!errors.preferredTime)}
                      >
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {errors.preferredTime && (
                    <p className="text-sm text-destructive">
                      {errors.preferredTime}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="message" className="text-foreground">
                    Additional Details (Optional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue or any specific requirements..."
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    rows={4}
                    maxLength={1000}
                    className="rounded-xl bg-background focus-visible:ring-2 focus-visible:ring-green/40"
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive">{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-8">
                <Button
                  type="submit"
                  variant="green"
                  size="xl"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending your request...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </Button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  No obligation • We respond within 24 hours • Your details stay
                  private
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
