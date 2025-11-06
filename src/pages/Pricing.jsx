import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ParkingCircle, Droplet, Sparkles, Zap, 
  CheckCircle, ArrowRight, TrendingDown, Star, Calendar 
} from "lucide-react";

export default function PricingPage() {
  const parkingPrices = [
    {
      title: "Court séjour",
      subtitle: "Parfait pour un week-end",
      duration: "1 à 3 jours",
      pricePerDay: 15,
      totalExample: "45€ pour 3 jours",
      badge: null,
      color: "blue",
      features: [
        "Service de voiturier professionnel",
        "Parking sécurisé et surveillé 24h/24",
        "Dépôt et récupération express",
        "Assistance client disponible",
        "Modification gratuite jusqu'à 24h avant"
      ]
    },
    {
      title: "Séjour moyen",
      subtitle: "Le plus populaire",
      duration: "4 à 7 jours",
      pricePerDay: 12,
      totalExample: "84€ pour 7 jours",
      badge: "⭐ Le plus populaire",
      color: "orange",
      features: [
        "Tous les avantages du court séjour",
        "Tarif réduit par jour",
        "Priorité de récupération",
        "Vérification des niveaux incluse",
        "Service client prioritaire"
      ]
    },
    {
      title: "Long séjour",
      subtitle: "Meilleur rapport qualité-prix",
      duration: "8 jours et plus",
      pricePerDay: 10,
      totalExample: "150€ pour 15 jours",
      badge: "💎 Meilleur rapport qualité-prix",
      color: "green",
      features: [
        "Tous les avantages du séjour moyen",
        "Meilleur prix au jour",
        "Tarif dégressif",
        "Service premium inclus",
        "Assistance prioritaire 24h/24 et 7j/7"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Droplet,
      title: "Lavage extérieur",
      price: "20€",
      description: "Lavage haute pression complet",
      features: [
        "Carrosserie nettoyée",
        "Jantes propres",
        "Produits premium",
        "Séchage soigné"
      ],
      color: "blue"
    },
    {
      icon: Sparkles,
      title: "Lavage complet",
      price: "45€",
      description: "Intérieur + extérieur impeccable",
      features: [
        "Tout le lavage extérieur",
        "Intérieur aspiré",
        "Tableau de bord nettoyé",
        "Vitres intérieures"
      ],
      color: "purple",
      popular: true
    },
    {
      icon: Zap,
      title: "Recharge électrique",
      price: "25€",
      description: "Pour véhicules électriques",
      features: [
        "95% de charge minimum",
        "Borne rapide",
        "Tous types de prises",
        "Véhicule prêt au départ"
      ],
      color: "green"
    }
  ];

  const comparisonData = [
    {
      feature: "Prix parking classique Orly",
      orlyvalet: "À partir de 10€/jour",
      airport: "~25€/jour",
      savings: "Économie de 60%"
    },
    {
      feature: "Service voiturier",
      orlyvalet: "✓ Inclus",
      airport: "✗ Non disponible",
      savings: "Gain de temps"
    },
    {
      feature: "Navette",
      orlyvalet: "✓ Pas besoin",
      airport: "✗ Navette obligatoire",
      savings: "15 min économisées"
    },
    {
      feature: "Assurance",
      orlyvalet: "✓ Tous risques",
      airport: "✗ Limitée",
      savings: "Sérénité totale"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-4 py-1.5 text-sm font-medium mb-6">
            <TrendingDown className="w-4 h-4 mr-2 inline" />
            Tarifs adaptés à tous les séjours
          </Badge>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Nos tarifs transparents
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Des prix clairs, sans surprise. Choisissez la formule adaptée à la durée de votre voyage
          </p>
        </div>
      </section>

      {/* Parking Prices */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Calendar className="w-12 h-12 mx-auto text-orange-500 mb-4" />
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Tarifs parking
            </h2>
            <p className="text-xl text-slate-600">Une formule pour chaque durée de séjour</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {parkingPrices.map((price, index) => (
              <Card key={index} className={`border-none smooth-shadow hover-lift ${
                price.badge ? 'ring-2 ring-orange-500 shadow-xl scale-105' : ''
              }`}>
                {price.badge && (
                  <div className={`text-white text-center py-2 text-sm font-semibold rounded-t-lg ${
                    price.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                    price.color === 'green' ? 'bg-gradient-to-r from-green-500 to-green-600' :
                    'bg-gradient-to-r from-blue-500 to-blue-600'
                  }`}>
                    {price.badge}
                  </div>
                )}
                <CardHeader>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-600 mb-2">{price.subtitle}</p>
                    <CardTitle className="text-2xl mb-4">{price.title}</CardTitle>
                    <div className="mb-4">
                      <span className={`text-5xl font-bold ${
                        price.color === 'blue' ? 'text-blue-500' :
                        price.color === 'orange' ? 'text-orange-500' :
                        'text-green-500'
                      }`}>
                        {price.pricePerDay}€
                      </span>
                      <span className="text-slate-600 ml-1">/ jour</span>
                    </div>
                    <Badge variant="outline" className={`
                      ${price.color === 'blue' ? 'border-blue-500 text-blue-700' :
                        price.color === 'orange' ? 'border-orange-500 text-orange-700' :
                        'border-green-500 text-green-700'}
                    `}>
                      {price.duration}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 font-medium">{price.totalExample}</p>
                  </div>
                  <ul className="space-y-3">
                    {price.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          price.color === 'blue' ? 'text-blue-500' :
                          price.color === 'orange' ? 'text-orange-500' :
                          'text-green-500'
                        }`} />
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={createPageUrl("Booking")}>
                    <Button className={`w-full mt-4 ${
                      price.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' :
                      price.color === 'orange' ? 'bg-orange-500 hover:bg-orange-600' :
                      'bg-green-600 hover:bg-green-700'
                    } text-white font-semibold`}>
                      Réserver
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-4xl mx-auto">
            <p className="text-blue-800">
              <strong>💡 Conseil :</strong> Le tarif est calculé automatiquement en fonction du nombre de jours lors de votre réservation
            </p>
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
              <Card key={index} className={`border-none smooth-shadow hover-lift ${
                service.popular ? 'ring-2 ring-purple-500 shadow-xl' : ''
              }`}>
                {service.popular && (
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center py-2 text-sm font-semibold rounded-t-lg">
                    ⭐ Plus populaire
                  </div>
                )}
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${
                    service.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    service.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    'from-green-500 to-green-600'
                  } rounded-xl flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1 text-center">{service.title}</h3>
                  <p className="text-3xl font-bold text-orange-500 text-center mb-2">{service.price}</p>
                  <p className="text-slate-600 text-sm text-center mb-6">{service.description}</p>
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

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
              Pourquoi OrlyValet ?
            </h2>
            <p className="text-xl text-slate-600">Comparez et économisez</p>
          </div>

          <Card className="border-none smooth-shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Critère</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        OrlyValet
                      </div>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold">Parking Aéroport</th>
                    <th className="px-6 py-4 text-center font-semibold text-orange-400">Avantage</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.orlyvalet}</td>
                      <td className="px-6 py-4 text-center text-slate-500">{row.airport}</td>
                      <td className="px-6 py-4 text-center">
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          {row.savings}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Prêt à économiser sur votre parking ?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Réservez maintenant et bénéficiez de tarifs adaptés à votre durée de séjour
          </p>
          <Link to={createPageUrl("Booking")}>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-10 py-6 text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300">
              Réserver maintenant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <p className="text-slate-300 mt-6 text-sm">
            ✓ Annulation gratuite jusqu'à 24h avant • ✓ Paiement sécurisé
          </p>
        </div>
      </section>
    </div>
  );
}