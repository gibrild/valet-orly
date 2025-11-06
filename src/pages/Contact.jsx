
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageSquare, CheckCircle, Loader2 
} from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data) => {
      await base44.integrations.Core.SendEmail({
        to: "valetorly@gmail.com", // Changed from contact@orlyvalet.fr
        subject: `Nouveau message de ${data.name}`,
        body: `
Nouveau message de contact :

Nom : ${data.name}
Email : ${data.email}
Téléphone : ${data.phone}

Message :
${data.message}
        `
      });

      // Confirmation email to customer
      await base44.integrations.Core.SendEmail({
        to: data.email,
        subject: "Nous avons bien reçu votre message - OrlyValet",
        body: `
Bonjour ${data.name},

Nous avons bien reçu votre message et nous vous remercions de votre intérêt pour OrlyValet.

Notre équipe vous répondra dans les plus brefs délais, généralement sous 24h.

Pour toute urgence, n'hésitez pas à nous appeler au 06 47 05 06 33.

Cordialement,
L'équipe OrlyValet
        `
      });
    },
    onSuccess: () => {
      toast.success("Message envoyé ! Nous vous répondrons rapidement.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    },
    onError: () => {
      toast.error("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessageMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Téléphone",
      content: "06 47 05 06 33",
      link: "tel:0647050633",
      color: "blue"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      content: "06 47 05 06 33",
      link: "https://wa.me/33647050633",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email",
      content: "valetorly@gmail.com", // Changed from contact@orlyvalet.fr
      link: "mailto:valetorly@gmail.com", // Changed from contact@orlyvalet.fr
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Zone de service",
      content: "Orly / Athis-Mons / Juvisy",
      link: null,
      color: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Une question ? Besoin d'informations ? Notre équipe est à votre disposition
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift text-center">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${
                    info.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    info.color === 'green' ? 'from-green-500 to-green-600' :
                    info.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <info.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{info.title}</h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-slate-600 hover:text-orange-500 transition-colors font-medium"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-slate-600">{info.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-none smooth-shadow">
              <CardHeader>
                <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
                <p className="text-slate-600 mt-2">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jean.dupont@email.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="06 12 34 56 78"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Comment pouvons-nous vous aider ?"
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={sendMessageMutation.isPending}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3"
                  >
                    {sendMessageMutation.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Info & Map */}
            <div className="space-y-6">
              <Card className="border-none smooth-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    Horaires
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                      <span className="text-slate-600">Lundi - Dimanche</span>
                      <span className="font-semibold text-slate-900">24h/24</span>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <p className="text-green-800 font-medium flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Service disponible tous les jours
                      </p>
                    </div>
                    <p className="text-sm text-slate-600">
                      Notre service est disponible 24 heures sur 24, 7 jours sur 7 pour vous offrir
                      une flexibilité maximale. Appelez-nous à tout moment !
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none smooth-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    Notre zone d'intervention
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d83998.94722689216!2d2.284509!3d48.7259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6718abc96f68f%3A0x97608929b438c03e!2sOrly%20Airport!5e0!3m2!1sen!2sfr!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Aéroport d'Orly (tous terminaux)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Athis-Mons
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Juvisy-sur-Orge
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-none smooth-shadow bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12 text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Besoin d'une réponse rapide ?
              </h3>
              <p className="text-slate-300 mb-8 text-lg">
                Appelez-nous directement ou contactez-nous via WhatsApp
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:0647050633">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    06 47 05 06 33
                  </Button>
                </a>
                <a href="https://wa.me/33647050633" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 w-full sm:w-auto">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
