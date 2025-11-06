import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, Quote, TrendingUp, Award, ArrowRight } from "lucide-react";

export default function ReviewsPage() {
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['all-reviews'],
    queryFn: () => base44.entities.Review.list('-review_date'),
    initialData: [],
  });

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0
      ? Math.round((reviews.filter(r => r.rating === rating).length / reviews.length) * 100)
      : 0
  }));

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="gradient-bg text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto text-orange-400 mb-6" />
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Avis de nos clients
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Découvrez ce que pensent nos clients de notre service de voiturier
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none smooth-shadow text-center">
              <CardContent className="p-8">
                <div className="text-5xl font-bold text-orange-500 mb-2">{averageRating}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-6 h-6 ${
                      i < Math.round(averageRating) ? 'text-orange-500 fill-orange-500' : 'text-slate-300'
                    }`} />
                  ))}
                </div>
                <p className="text-slate-600">Note moyenne</p>
                <p className="text-sm text-slate-500 mt-1">Basée sur {reviews.length} avis</p>
              </CardContent>
            </Card>

            <Card className="border-none smooth-shadow text-center">
              <CardContent className="p-8">
                <TrendingUp className="w-12 h-12 mx-auto text-green-500 mb-4" />
                <div className="text-3xl font-bold text-slate-900 mb-2">
                  {ratingDistribution[0]?.percentage}%
                </div>
                <p className="text-slate-600">Avis 5 étoiles</p>
                <p className="text-sm text-slate-500 mt-1">Excellence du service</p>
              </CardContent>
            </Card>

            <Card className="border-none smooth-shadow text-center">
              <CardContent className="p-8">
                <Award className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                <div className="text-3xl font-bold text-slate-900 mb-2">98%</div>
                <p className="text-slate-600">Clients satisfaits</p>
                <p className="text-sm text-slate-500 mt-1">Recommandent notre service</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Rating Distribution */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Distribution des notes
          </h2>
          <Card className="border-none smooth-shadow">
            <CardContent className="p-6">
              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-20">
                      <span className="text-sm font-medium text-slate-700">{item.rating}</span>
                      <Star className="w-4 h-4 text-orange-500 fill-orange-500" />
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-600 w-16 text-right">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Ce que disent nos clients
          </h2>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="border-none smooth-shadow">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-24 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <Card className="border-none smooth-shadow">
              <CardContent className="p-12 text-center">
                <Star className="w-16 h-16 mx-auto text-slate-300 mb-4" />
                <p className="text-slate-600 text-lg mb-4">
                  Aucun avis pour le moment
                </p>
                <p className="text-slate-500">
                  Soyez le premier à partager votre expérience !
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <Card key={review.id} className="border-none smooth-shadow hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${
                          i < review.rating ? 'text-orange-500 fill-orange-500' : 'text-slate-300'
                        }`} />
                      ))}
                    </div>
                    
                    <div className="relative mb-4">
                      <Quote className="absolute -top-2 -left-2 w-8 h-8 text-orange-500/20" />
                      <p className="text-slate-700 leading-relaxed relative z-10 pl-4">
                        {review.comment}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                      <div>
                        <p className="font-semibold text-slate-900">{review.customer_name}</p>
                        {review.destination && (
                          <p className="text-sm text-slate-500">✈️ {review.destination}</p>
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
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-bg text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Rejoignez nos clients satisfaits
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Vivez vous aussi l'expérience OrlyValet et voyagez l'esprit tranquille
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