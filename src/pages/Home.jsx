
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Car, Shield, Clock, CreditCard, Star, CheckCircle, 
  Phone, MapPin, Zap, Sparkles, ArrowRight, Calendar,
  Droplet, TrendingDown, Award
} from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews'],
    queryFn: () => base44.entities.Review.list('-review_date', 6),
    initialData: [],
  });

  const advantages = [
    {
      icon: Clock,
      title: "Service 7j/7",
      description: "Disponible tous les jours, 24h/24 pour votre confort",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Parking sécurisé",
      description: "Surveillance continue et assurance tous risques",
      color: "green"
    },
    {
      icon: CreditCard,
      title: "Paiement sécurisé",
      description: "Plateforme de paiement en ligne 100% sécurisée",
      color: "purple"
    },
    {
      icon: Phone,
      title: "Service client réactif",
      description: "Une équipe à votre écoute pour toute demande",
      color: "orange"
    }
  ];

  const parkingOffers = [
    {
      title: "Court séjour",
      subtitle: "Parfait pour un week-end",
      price: "15€",
      duration: "1 à 3 jours",
      color: "blue",
      features: [
        "Service de voiturier professionnel",
        "Parking sécurisé et surveillé 24h/24",
        "Dépôt et récupération express",
        "Assistance client disponible",
        "Modification gratuite jusqu'à 24h avant"
      ],
      highlight: false,
      buttonClass: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Séjour moyen",
      subtitle: "Le plus populaire",
      price: "12€",
      duration: "4 à 7 jours",
      color: "orange",
      features: [
        "Tous les avantages du court séjour",
        "Tarif réduit par jour",
        "Priorité de récupération",
        "Vérification des niveaux incluse",
        "Service client prioritaire"
      ],
      highlight: true,
      buttonClass: "bg-orange-500 hover:bg-orange-600"
    },
    {
      title: "Long séjour",
      subtitle: "Meilleur rapport qualité-prix",
      price: "10€",
      duration: "8 jours et plus",
      color: "green",
      features: [
        "Tous les avantages du séjour moyen",
        "Meilleur prix au jour",
        "Tarif dégressif",
        "Service premium inclus",
        "Assistance prioritaire 24h/24 et 7j/7"
      ],
      highlight: false,
      buttonClass: "bg-green-600 hover:bg-green-700"
    }
  ];

  const additionalServices = [
    {
      icon: Droplet,
      title: "Lavage extérieur",
      price: "20€",
      description: "Votre voiture propre à votre retour",
      features: ["Lavage haute pression", "Produits premium", "Séchage soigné"],
      color: "blue"
    },
    {
      icon: Sparkles,
      title: "Lavage complet",
      price: "45€",
      description: "Intérieur + extérieur pour un véhicule impeccable",
      features: ["Intérieur aspiré", "Tableau de bord", "Vitres nettoyées"],
      color: "purple"
    },
    {
      icon: Zap,
      title: "Recharge électrique",
      price: "25€",
      description: "95% de charge minimum garantie",
      features: ["Borne rapide", "Charge complète", "Véhicules électriques"],
      color: "green"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Déposez votre voiture",
      description: "Rendez-vous au terminal convenu, notre voiturier vous accueille et prend en charge votre véhicule immédiatement",
      icon: MapPin
    },
    {
      number: "02",
      title: "Voyagez tranquille",
      description: "Partez l'esprit léger, votre voiture est en sécurité dans notre parking surveillé",
      icon: Shield
    },
    {
      number: "03",
      title: "Récupérez votre voiture",
      description: "À votre retour, nous vous ramenons votre véhicule au terminal, prêt à partir",
      icon: Car
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative gradient-bg text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Service Premium
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Gagnez du temps avec notre{" "}
                <span className="gradient-text">service de voiturier</span> à Orly
              </h1>
              <p className="text-xl text-slate-300 max-w-xl">
                Parking sécurisé à partir de <span className="text-orange-400 font-bold text-2xl">10€ / jour</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl("Booking")}>
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 w-full sm:w-auto">
                    Réserver maintenant
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <a href="https://wa.me/33647050633" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="border-2 border-orange-400 bg-white/10 text-orange-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 font-semibold px-8 py-6 text-lg w-full sm:w-auto transition-all duration-300">
                    <Phone className="w-5 h-5 mr-2" />
                    06 47 05 06 33
                  </Button>
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000" 
                alt="Aéroport d'Orly" 
                className="rounded-2xl shadow-2xl hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-slate-600">Simple, rapide et efficace en 3 étapes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden border-none smooth-shadow hover-lift">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-[100px]" />
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-6xl font-bold text-orange-500/20">{step.number}</span>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <step.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Nos avantages
            </h2>
            <p className="text-xl text-slate-600">Un service pensé pour votre tranquillité</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                    advantage.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    advantage.color === 'green' ? 'from-green-500 to-green-600' :
                    advantage.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-orange-500 to-orange-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <advantage.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{advantage.title}</h3>
                  <p className="text-slate-600 text-sm">{advantage.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Parking Offers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Calendar className="w-12 h-12 mx-auto text-orange-500 mb-4" />
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Nos formules de parking
            </h2>
            <p className="text-xl text-slate-600">Choisissez la formule adaptée à votre séjour</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {parkingOffers.map((offer, index) => (
              <Card key={index} className={`border-none smooth-shadow hover-lift ${
                offer.highlight ? 'ring-2 ring-orange-500 shadow-xl scale-105' : ''
              }`}>
                {offer.highlight && (
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                    ⭐ {offer.subtitle}
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    {!offer.highlight && (
                      <p className="text-sm font-semibold text-slate-600 mb-2">{offer.subtitle}</p>
                    )}
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{offer.title}</h3>
                    <div className="my-4">
                      <span className="text-5xl font-bold text-orange-500">{offer.price}</span>
                      <span className="text-slate-600 ml-1">/ jour</span>
                    </div>
                    <Badge variant="outline" className={`
                      ${offer.color === 'blue' ? 'border-blue-500 text-blue-700' :
                        offer.color === 'orange' ? 'border-orange-500 text-orange-700' :
                        'border-green-500 text-green-700'}
                    `}>
                      {offer.duration}
                    </Badge>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {offer.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          offer.color === 'blue' ? 'text-blue-500' :
                          offer.color === 'orange' ? 'text-orange-500' :
                          'text-green-500'
                        }`} />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={createPageUrl("Booking")}>
                    <Button className={`w-full ${offer.buttonClass} text-white font-semibold py-3`}>
                      Réserver
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-slate-600 mb-4">💡 Combinez avec nos services additionnels</p>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Services additionnels
            </h2>
            <p className="text-xl text-slate-600">Personnalisez votre expérience</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-none smooth-shadow hover-lift">
                <CardContent className="p-6">
                  <div className={`w-14 h-14 mx-auto mb-4 bg-gradient-to-br ${
                    service.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    service.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">{service.title}</h3>
                  <p className="text-3xl font-bold text-orange-500 text-center mb-2">{service.price}</p>
                  <p className="text-slate-600 text-sm text-center mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-slate-600">Des milliers de voyageurs satisfaits</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="border-none smooth-shadow hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-300'}`} />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">"{review.comment}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{review.customer_name}</p>
                      {review.destination && (
                        <p className="text-sm text-slate-500">Destination: {review.destination}</p>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      {new Date(review.review_date).toLocaleDateString('fr-FR', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to={createPageUrl("Reviews")} className="text-orange-500 hover:text-orange-600 font-semibold inline-flex items-center gap-2">
              Voir tous les avis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Prêt à partir en toute sérénité ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Réservez votre place de parking maintenant et profitez de nos services premium
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Booking")}>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 w-full sm:w-auto">
                Réserver maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <a href="https://wa.me/33647050633" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-10 py-6 text-lg w-full sm:w-auto">
                <Phone className="w-5 h-5 mr-2" />
                Nous contacter
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
