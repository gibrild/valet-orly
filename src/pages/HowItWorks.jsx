import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, Shield, Car, Phone, Clock, Key, 
  CheckCircle, ArrowRight, Building2, ParkingCircle 
} from "lucide-react";

export default function HowItWorksPage() {
  const mainSteps = [
    {
      number: "01",
      title: "Réservez en ligne",
      description: "Remplissez le formulaire de réservation en quelques minutes. Choisissez vos dates, votre terminal et vos options.",
      icon: Phone,
      color: "blue"
    },
    {
      number: "02",
      title: "Déposez votre voiture",
      description: "Rendez-vous directement au terminal choisi. Notre voiturier vous accueille et prend en charge votre véhicule immédiatement.",
      icon: MapPin,
      color: "purple"
    },
    {
      number: "03",
      title: "Voyagez tranquille",
      description: "Votre voiture est garée dans notre parking sécurisé et surveillé 24h/24. Partez l'esprit léger.",
      icon: Shield,
      color: "green"
    },
    {
      number: "04",
      title: "Récupérez votre voiture",
      description: "À votre retour, nous vous ramenons votre véhicule directement au terminal. Prêt à repartir !",
      icon: Car,
      color: "orange"
    }
  ];

  const details = [
    {
      icon: Clock,
      title: "Gain de temps",
      description: "Plus besoin de chercher une place ou de prendre une navette. Nous nous occupons de tout.",
      stats: "15 min économisées en moyenne"
    },
    {
      icon: Shield,
      title: "Sécurité maximale",
      description: "Parking surveillé 24h/24 avec vidéosurveillance et assurance tous risques incluse.",
      stats: "0 incident depuis 5 ans"
    },
    {
      icon: Key,
      title: "Service personnalisé",
      description: "Chaque voiture est traitée avec soin. Options de lavage et recharge disponibles.",
      stats: "98% de satisfaction client"
    },
    {
      icon: ParkingCircle,
      title: "Parking dédié",
      description: "Votre véhicule reste sur place, pas de rotation. Emplacement sécurisé et couvert.",
      stats: "Parking à 5 min de l'aéroport"
    }
  ];

  const faqs = [
    {
      question: "Où est garé mon véhicule ?",
      answer: "Votre voiture est garée dans notre parking privé sécurisé situé à 5 minutes de l'aéroport d'Orly. Le parking est couvert, surveillé 24h/24 et équipé de vidéosurveillance."
    },
    {
      question: "Comment se passe la prise en charge ?",
      answer: "À votre arrivée au terminal indiqué, appelez-nous au 06 47 05 06 33. Notre voiturier vous rejoint en moins de 5 minutes pour récupérer votre véhicule et vos clés."
    },
    {
      question: "Et si mon vol a du retard ?",
      answer: "Pas de problème ! Prévenez-nous dès que possible et nous nous adaptons à votre nouvel horaire d'arrivée sans frais supplémentaires."
    },
    {
      question: "Mon véhicule est-il assuré ?",
      answer: "Oui, tous les véhicules garés sont couverts par notre assurance tous risques pendant toute la durée du stationnement."
    },
    {
      question: "Puis-je modifier ma réservation ?",
      answer: "Oui, vous pouvez modifier votre réservation jusqu'à 24h avant la date prévue en nous contactant par téléphone ou email."
    },
    {
      question: "Quels moyens de paiement acceptez-vous ?",
      answer: "Nous acceptons les paiements par carte bancaire en ligne (sécurisé), espèces et chèques sur place."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Comment ça marche ?
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Un service simple, rapide et sécurisé en 4 étapes
          </p>
        </div>
      </section>

      {/* Main Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {mainSteps.map((step, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-[200px_1fr] gap-6">
                    <div className={`bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      step.color === 'purple' ? 'from-purple-500 to-purple-600' :
                      step.color === 'green' ? 'from-green-500 to-green-600' :
                      'from-orange-500 to-orange-600'
                    } p-8 flex flex-col items-center justify-center text-white`}>
                      <span className="text-6xl font-bold opacity-50 mb-4">{step.number}</span>
                      <step.icon className="w-16 h-16" />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                      <p className="text-slate-600 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to={createPageUrl("Booking")}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-6 text-lg shadow-lg">
                Commencer ma réservation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Pourquoi choisir OrlyValet ?
            </h2>
            <p className="text-xl text-slate-600">Des avantages qui font la différence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {details.map((detail, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <detail.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{detail.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{detail.description}</p>
                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs font-semibold text-orange-500">{detail.stats}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Questions fréquentes
            </h2>
            <p className="text-xl text-slate-600">Tout ce que vous devez savoir</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-orange-500" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.question}</h3>
                      <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 mb-4">Une autre question ?</p>
            <Link to={createPageUrl("Contact")}>
              <Button variant="outline" size="lg" className="font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                Contactez-nous
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Prêt à essayer notre service ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Réservez dès maintenant et profitez d'un voyage sans stress
          </p>
          <Link to={createPageUrl("Booking")}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
              Réserver maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}