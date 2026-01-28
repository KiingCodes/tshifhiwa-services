import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, Wrench, Zap, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number is too long"),
  serviceType: z.string().min(1, "Please select a service type"),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z.string().min(1, "Please select a date"),
  preferredTime: z.string().min(1, "Please select a time"),
  message: z.string().trim().max(500, "Message is too long").optional(),
});

const plumbingServiceOptions = [
  "Leak Detection & Repair",
  "Bathroom & Kitchen Plumbing",
  "Drain Cleaning",
  "Geyser Installation",
  "Pipe Repairs & Replacement",
  "Emergency Plumbing",
];

const electricalServiceOptions = [
  "Lighting Installation",
  "Power Points & Sockets",
  "DB Board Installation",
  "Electrical Wiring",
  "Ceiling Fan Installation",
  "Emergency Electrical",
];

const timeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "Emergency (After Hours)",
];

const BookingForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      bookingSchema.parse(formData);
      setIsSubmitting(true);

      // Call edge function to send email
      const { data, error } = await supabase.functions.invoke('send-booking', {
        body: formData,
      });

      if (error) {
        throw new Error(error.message || 'Failed to submit booking');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to submit booking');
      }

      setIsSuccess(true);
      toast({
        title: "Booking Submitted Successfully!",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          serviceType: "",
          service: "",
          preferredDate: "",
          preferredTime: "",
          message: "",
        });
        setIsSuccess(false);
      }, 3000);

    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = formData.serviceType === "plumbing" 
    ? plumbingServiceOptions 
    : formData.serviceType === "electrical" 
    ? electricalServiceOptions 
    : [];

  if (isSuccess) {
    return (
      <section id="booking" className="py-24 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green/20 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green" />
            </div>
            <h2 className="font-display text-4xl text-foreground mb-4">BOOKING CONFIRMED!</h2>
            <p className="text-muted-foreground text-lg">
              Thank you for choosing Tshifhiwa Plumbing & Electrical. We'll contact you within 24 hours to confirm your appointment.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-green font-display uppercase tracking-widest text-sm mb-4">Get Started</span>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            BOOK A <span className="text-gradient-green">SERVICE</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Fill out the form below and we'll get back to you within 24 hours to confirm your appointment.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto bg-card rounded-xl shadow-elevated p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-foreground">
                <User className="w-4 h-4 text-green" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => handleChange("name", e.target.value)}
                className={errors.name ? "border-destructive" : ""}
              />
              {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-foreground">
                <Mail className="w-4 h-4 text-green" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => handleChange("email", e.target.value)}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-foreground">
                <Phone className="w-4 h-4 text-green" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="083 212 0479"
                value={formData.phone}
                onChange={e => handleChange("phone", e.target.value)}
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
            </div>

            {/* Service Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                {formData.serviceType === "electrical" ? <Zap className="w-4 h-4 text-electric" /> : <Wrench className="w-4 h-4 text-green" />}
                Service Type *
              </Label>
              <Select value={formData.serviceType} onValueChange={value => {
                handleChange("serviceType", value);
                handleChange("service", "");
              }}>
                <SelectTrigger className={errors.serviceType ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="plumbing">🔧 Plumbing</SelectItem>
                  <SelectItem value="electrical">⚡ Electrical</SelectItem>
                </SelectContent>
              </Select>
              {errors.serviceType && <p className="text-destructive text-sm">{errors.serviceType}</p>}
            </div>

            {/* Specific Service */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-green" />
                Specific Service *
              </Label>
              <Select 
                value={formData.service} 
                onValueChange={value => handleChange("service", value)}
                disabled={!formData.serviceType}
              >
                <SelectTrigger className={errors.service ? "border-destructive" : ""}>
                  <SelectValue placeholder={formData.serviceType ? "Select a service" : "Select service type first"} />
                </SelectTrigger>
                <SelectContent>
                  {serviceOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.service && <p className="text-destructive text-sm">{errors.service}</p>}
            </div>

            {/* Preferred Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
                <Calendar className="w-4 h-4 text-green" />
                Preferred Date *
              </Label>
              <Input
                id="date"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.preferredDate}
                onChange={e => handleChange("preferredDate", e.target.value)}
                className={errors.preferredDate ? "border-destructive" : ""}
              />
              {errors.preferredDate && <p className="text-destructive text-sm">{errors.preferredDate}</p>}
            </div>

            {/* Preferred Time */}
            <div className="space-y-2 md:col-span-2">
              <Label className="flex items-center gap-2 text-foreground">
                <Clock className="w-4 h-4 text-green" />
                Preferred Time *
              </Label>
              <Select value={formData.preferredTime} onValueChange={value => handleChange("preferredTime", value)}>
                <SelectTrigger className={errors.preferredTime ? "border-destructive" : ""}>
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot, index) => (
                    <SelectItem key={index} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.preferredTime && <p className="text-destructive text-sm">{errors.preferredTime}</p>}
            </div>

            {/* Message */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="message" className="flex items-center gap-2 text-foreground">
                <MessageSquare className="w-4 h-4 text-green" />
                Additional Details (Optional)
              </Label>
              <Textarea
                id="message"
                placeholder="Describe your issue or any specific requirements..."
                value={formData.message}
                onChange={e => handleChange("message", e.target.value)}
                rows={4}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <Button 
              type="submit" 
              variant="green" 
              size="xl" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Book Appointment"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookingForm;
