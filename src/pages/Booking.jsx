
import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, Car, Mail, Phone, User, CreditCard, CheckCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function BookingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    drop_off_date: "",
    drop_off_time: "10:00",
    drop_off_terminal: "", // Changed from 'terminal'
    pick_up_date: "",
    pick_up_time: "10:00",
    pick_up_terminal: "", // New field
    vehicle_model: "",
    vehicle_plate: "",
    exterior_wash: false,
    full_wash: false,
    electric_charge: false,
    special_requests: ""
  });

  const steps = [
    { number: 1, title: "Vos informations", icon: User },
    { number: 2, title: "Dates & terminaux", icon: Calendar }, // Title updated
    { number: 3, title: "Votre véhicule", icon: Car },
    { number: 4, title: "Options", icon: CreditCard },
    { number: 5, title: "Confirmation", icon: CheckCircle }
  ];

  const createBookingMutation = useMutation({
    mutationFn: async (data) => {
      console.log("🔄 Création de la réservation...", data);
      const booking = await base44.entities.Booking.create(data);
      console.log("✅ Réservation créée avec succès:", booking.id);
      
      const emailBody = `Nouvelle réservation reçue !

👤 CLIENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nom : ${data.first_name} ${data.last_name}
Email : ${data.email}
Téléphone : ${data.phone}

📅 DATES ET TERMINAUX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dépôt : ${new Date(data.drop_off_date).toLocaleDateString('fr-FR')} à ${data.drop_off_time}
Terminal de dépôt : ${data.drop_off_terminal}

Récupération : ${new Date(data.pick_up_date).toLocaleDateString('fr-FR')} à ${data.pick_up_time}
Terminal de récupération : ${data.pick_up_terminal}

Durée : ${data.parking_days} jour${data.parking_days > 1 ? 's' : ''}

🚗 VÉHICULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${data.vehicle_model ? `Modèle : ${data.vehicle_model}\n` : ''}${data.vehicle_plate ? `Immatriculation : ${data.vehicle_plate}` : 'Immatriculation : Non renseignée'}

💰 TARIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Parking : ${(data.total_price - (data.full_wash ? 45 : data.exterior_wash ? 20 : 0) - (data.electric_charge ? 25 : 0))} €
${data.exterior_wash ? 'Lavage extérieur : 20 €\n' : ''}${data.full_wash ? 'Lavage complet : 45 €\n' : ''}${data.electric_charge ? 'Recharge électrique : 25 €\n' : ''}TOTAL : ${data.total_price} €

${data.special_requests ? `📝 DEMANDES SPÉCIALES\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${data.special_requests}\n\n` : ''}Statut : ${data.status}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Réservation ID: ${booking.id}`;

      try {
        console.log("📧 Envoi des notifications aux administrateurs...");
        
        await Promise.all([
          base44.integrations.Core.SendEmail({
            to: "valetorly@gmail.com",
            subject: `🎯 Nouvelle réservation - ${data.first_name} ${data.last_name}`,
            body: emailBody
          }),
          base44.integrations.Core.SendEmail({
            to: "gibril.djellal@gmail.com",
            subject: `🎯 Nouvelle réservation - ${data.first_name} ${data.last_name}`,
            body: emailBody
          })
        ]);
        
        console.log("✅ Notifications administrateurs envoyées");
      } catch (error) {
        console.error("❌ Erreur envoi notification:", error);
      }
      
      return booking;
    },
    onSuccess: (booking) => {
      toast.success(
        `Réservation confirmée ! Référence : #${booking.id.substring(0, 8)}. Nous vous contacterons par email ou téléphone pour confirmer les détails.`,
        { duration: 6000 }
      );
      setTimeout(() => {
        navigate(createPageUrl("Home"));
      }, 3000);
    },
    onError: (error) => {
      console.error("❌ Erreur création réservation:", error);
      toast.error("Une erreur est survenue. Veuillez réessayer ou nous appeler au 06 47 05 06 33.");
    }
  });

  const calculatePrice = () => {
    if (!formData.drop_off_date || !formData.pick_up_date) return 0;
    
    const dropOff = new Date(formData.drop_off_date);
    const pickUp = new Date(formData.pick_up_date);
    const days = Math.ceil((pickUp - dropOff) / (1000 * 60 * 60 * 24));
    
    if (days < 1) return 0;
    
    let parkingPrice = 0;
    
    if (days <= 3) {
      parkingPrice = days * 15;
    } else if (days <= 7) {
      parkingPrice = days * 12;
    } else {
      parkingPrice = days * 10;
    }
    
    let totalPrice = parkingPrice;
    
    if (formData.full_wash) {
      totalPrice += 45;
    } else if (formData.exterior_wash) {
      totalPrice += 20;
    }
    
    if (formData.electric_charge) {
      totalPrice += 25;
    }
    
    return totalPrice;
  };

  const getDays = () => {
    if (!formData.drop_off_date || !formData.pick_up_date) return 0;
    const dropOff = new Date(formData.drop_off_date);
    const pickUp = new Date(formData.pick_up_date);
    return Math.ceil((pickUp - dropOff) / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = () => {
    const totalPrice = calculatePrice();
    const days = getDays();
    
    if (days < 1) {
      toast.error("La date de récupération doit être après la date de dépôt");
      return;
    }
    
    createBookingMutation.mutate({
      ...formData,
      parking_days: days,
      total_price: totalPrice,
      status: "Confirmée"
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const canGoToNextStep = () => {
    if (currentStep === 1) {
      return formData.first_name && formData.last_name && formData.email && formData.phone;
    }
    if (currentStep === 2) {
      // Updated condition for new terminal fields
      return formData.drop_off_date && formData.pick_up_date && formData.drop_off_time && formData.pick_up_time && formData.drop_off_terminal && formData.pick_up_terminal;
    }
    return true;
  };

  const nextStep = () => {
    if (canGoToNextStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    } else {
      toast.error("Veuillez remplir tous les champs obligatoires");
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const totalPrice = calculatePrice();
  const parkingDays = getDays();

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">
            Réservez votre place
          </h1>
          <p className="text-xl text-slate-600">
            Suivez les étapes pour finaliser votre réservation
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    currentStep >= step.number
                      ? 'bg-orange-500 text-white shadow-lg scale-110'
                      : 'bg-slate-200 text-slate-400'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-medium text-center hidden sm:block ${
                    currentStep >= step.number ? 'text-slate-900' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 rounded transition-all duration-300 ${
                    currentStep > step.number ? 'bg-orange-500' : 'bg-slate-200'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="border-none smooth-shadow mb-6">
          <CardContent className="p-8">
            {/* Step 1: Personal Info */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-900">Vos informations</h2>
                  <p className="text-slate-600">Commençons par vos coordonnées</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">Prénom *</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => handleInputChange("first_name", e.target.value)}
                      placeholder="Jean"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Nom *</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => handleInputChange("last_name", e.target.value)}
                      placeholder="Dupont"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="jean.dupont@email.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        type="tel"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="06 12 34 56 78"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Dates & Terminals */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Calendar className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-900">Dates, horaires et terminaux</h2> {/* Title updated */}
                  <p className="text-slate-600">Quand et où souhaitez-vous déposer et récupérer votre véhicule ?</p> {/* Description updated */}
                </div>

                {/* Info box added */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">Dépôt et récupération</h3>
                      <p className="text-sm text-blue-700">Sélectionnez le terminal pour le dépôt et celui pour la récupération de votre véhicule</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Drop-off section */}
                  <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                      Dépôt du véhicule
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="drop_off_terminal">Terminal de dépôt *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 z-10" />
                          <Select value={formData.drop_off_terminal} onValueChange={(value) => handleInputChange("drop_off_terminal", value)}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Choisir terminal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Terminal 1">Terminal 1</SelectItem>
                              <SelectItem value="Terminal 2">Terminal 2</SelectItem>
                              <SelectItem value="Terminal 3">Terminal 3</SelectItem>
                              <SelectItem value="Terminal 4">Terminal 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="drop_off_date">Date *</Label>
                        <Input
                          id="drop_off_date"
                          type="date"
                          value={formData.drop_off_date}
                          onChange={(e) => handleInputChange("drop_off_date", e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="drop_off_time">Heure *</Label>
                        <Input
                          id="drop_off_time"
                          type="time"
                          value={formData.drop_off_time}
                          onChange={(e) => handleInputChange("drop_off_time", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pick-up section */}
                  <div className="bg-white border-2 border-slate-200 rounded-lg p-6">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                      Récupération du véhicule
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pick_up_terminal">Terminal de récupération *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 z-10" />
                          <Select value={formData.pick_up_terminal} onValueChange={(value) => handleInputChange("pick_up_terminal", value)}>
                            <SelectTrigger className="pl-10">
                              <SelectValue placeholder="Choisir terminal" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Terminal 1">Terminal 1</SelectItem>
                              <SelectItem value="Terminal 2">Terminal 2</SelectItem>
                              <SelectItem value="Terminal 3">Terminal 3</SelectItem>
                              <SelectItem value="Terminal 4">Terminal 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pick_up_date">Date *</Label>
                        <Input
                          id="pick_up_date"
                          type="date"
                          value={formData.pick_up_date}
                          onChange={(e) => handleInputChange("pick_up_date", e.target.value)}
                          min={formData.drop_off_date || new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pick_up_time">Heure *</Label>
                        <Input
                          id="pick_up_time"
                          type="time"
                          value={formData.pick_up_time}
                          onChange={(e) => handleInputChange("pick_up_time", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {parkingDays > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                    <p className="text-blue-800 font-semibold">
                      Durée du parking : {parkingDays} jour{parkingDays > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Vehicle */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <Car className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-900">Votre véhicule</h2>
                  <p className="text-slate-600">Ces informations nous aident à mieux vous servir</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vehicle_model">Modèle du véhicule (optionnel)</Label>
                    <Input
                      id="vehicle_model"
                      value={formData.vehicle_model}
                      onChange={(e) => handleInputChange("vehicle_model", e.target.value)}
                      placeholder="Ex: Peugeot 308, Renault Clio..."
                    />
                    <p className="text-xs text-slate-500">
                      Cette information est optionnelle mais nous aide à identifier votre véhicule
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle_plate">Plaque d'immatriculation (optionnel)</Label>
                    <Input
                      id="vehicle_plate"
                      value={formData.vehicle_plate}
                      onChange={(e) => handleInputChange("vehicle_plate", e.target.value.toUpperCase())}
                      placeholder="AB-123-CD"
                      className="uppercase"
                    />
                    <p className="text-xs text-slate-500">
                      Vous pourrez la communiquer plus tard si vous ne l'avez pas maintenant
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Options */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CreditCard className="w-12 h-12 mx-auto text-orange-500 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-900">Options supplémentaires</h2>
                  <p className="text-slate-600">Personnalisez votre expérience</p>
                </div>
                <div className="space-y-4">
                  <div className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all ${
                    formData.exterior_wash && !formData.full_wash
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}>
                    <Checkbox
                      id="exterior_wash"
                      checked={formData.exterior_wash && !formData.full_wash}
                      onCheckedChange={(checked) => {
                        handleInputChange("exterior_wash", checked);
                        if (checked) handleInputChange("full_wash", false);
                      }}
                      className={formData.exterior_wash && !formData.full_wash ? 'border-orange-500 data-[state=checked]:bg-orange-500' : ''}
                    />
                    <div className="flex-1">
                      <Label htmlFor="exterior_wash" className={`font-semibold cursor-pointer ${
                        formData.exterior_wash && !formData.full_wash ? 'text-orange-700' : ''
                      }`}>
                        Lavage extérieur (+20€)
                        {formData.exterior_wash && !formData.full_wash && <span className="ml-2 text-orange-600">✓ Sélectionné</span>}
                      </Label>
                      <p className={`text-sm ${
                        formData.exterior_wash && !formData.full_wash ? 'text-orange-600' : 'text-slate-600'
                      }`}>
                        Lavage haute pression et produits premium
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all ${
                    formData.full_wash
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}>
                    <Checkbox
                      id="full_wash"
                      checked={formData.full_wash}
                      onCheckedChange={(checked) => {
                        handleInputChange("full_wash", checked);
                        if (checked) handleInputChange("exterior_wash", false);
                      }}
                      className={formData.full_wash ? 'border-orange-500 data-[state=checked]:bg-orange-500' : ''}
                    />
                    <div className="flex-1">
                      <Label htmlFor="full_wash" className={`font-semibold cursor-pointer ${
                        formData.full_wash ? 'text-orange-700' : ''
                      }`}>
                        Lavage complet intérieur + extérieur (+45€)
                        {formData.full_wash && <span className="ml-2 text-orange-600">✓ Sélectionné</span>}
                      </Label>
                      <p className={`text-sm ${
                        formData.full_wash ? 'text-orange-600' : 'text-slate-600'
                      }`}>
                        Intérieur aspiré, tableau de bord, vitres
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start space-x-3 p-4 border-2 rounded-lg transition-all ${
                    formData.electric_charge
                      ? 'border-orange-500 bg-orange-50 shadow-md'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}>
                    <Checkbox
                      id="electric_charge"
                      checked={formData.electric_charge}
                      onCheckedChange={(checked) => handleInputChange("electric_charge", checked)}
                      className={formData.electric_charge ? 'border-orange-500 data-[state=checked]:bg-orange-500' : ''}
                    />
                    <div className="flex-1">
                      <Label htmlFor="electric_charge" className={`font-semibold cursor-pointer ${
                        formData.electric_charge ? 'text-orange-700' : ''
                      }`}>
                        Recharge véhicule électrique (+25€ min.)
                        {formData.electric_charge && <span className="ml-2 text-orange-600">✓ Sélectionné</span>}
                      </Label>
                      <p className={`text-sm ${
                        formData.electric_charge ? 'text-orange-600' : 'text-slate-600'
                      }`}>
                        95% de charge minimum garanti
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special_requests">Demandes spéciales</Label>
                    <Textarea
                      id="special_requests"
                      value={formData.special_requests}
                      onChange={(e) => handleInputChange("special_requests", e.target.value)}
                      placeholder="Avez-vous des demandes particulières ?"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-3" />
                  <h2 className="text-2xl font-bold text-slate-900">Récapitulatif</h2>
                  <p className="text-slate-600">Vérifiez vos informations avant de confirmer</p>
                </div>

                <div className="space-y-4">
                  <Card className="border border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5 text-orange-500" />
                        Informations personnelles
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      <p><strong>Nom :</strong> {formData.first_name} {formData.last_name}</p>
                      <p><strong>Email :</strong> {formData.email}</p>
                      <p><strong>Téléphone :</strong> {formData.phone}</p>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Dates et terminaux {/* Title updated */}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 space-y-3">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="font-semibold text-green-900 mb-1">📍 Dépôt</p>
                        <p><strong>Terminal :</strong> {formData.drop_off_terminal}</p>
                        <p><strong>Date :</strong> {new Date(formData.drop_off_date).toLocaleDateString('fr-FR')} à {formData.drop_off_time}</p>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                        <p className="font-semibold text-orange-900 mb-1">📍 Récupération</p>
                        <p><strong>Terminal :</strong> {formData.pick_up_terminal}</p>
                        <p><strong>Date :</strong> {new Date(formData.pick_up_date).toLocaleDateString('fr-FR')} à {formData.pick_up_time}</p>
                      </div>
                      <p><strong>Durée :</strong> {parkingDays} jour{parkingDays > 1 ? 's' : ''}</p>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Car className="w-5 h-5 text-orange-500" />
                        Véhicule
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600">
                      <p><strong>Modèle :</strong> {formData.vehicle_model || "Non renseigné"}</p>
                      <p><strong>Plaque :</strong> {formData.vehicle_plate || "Non renseignée"}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center pb-3 border-b border-white/20">
                          <span className="text-slate-300">Parking ({parkingDays} jour{parkingDays > 1 ? 's' : ''})</span>
                          <span className="font-semibold">{(totalPrice - (formData.full_wash ? 45 : formData.exterior_wash ? 20 : 0) - (formData.electric_charge ? 25 : 0))} €</span>
                        </div>
                        
                        {(formData.exterior_wash || formData.full_wash) && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">
                              {formData.full_wash ? "Lavage complet" : "Lavage extérieur"}
                            </span>
                            <span className="font-semibold">{formData.full_wash ? 45 : 20} €</span>
                          </div>
                        )}
                        
                        {formData.electric_charge && (
                          <div className="flex justify-between items-center">
                            <span className="text-slate-300">Recharge électrique</span>
                            <span className="font-semibold">25 €</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center pt-3 border-t border-white/20">
                          <span className="text-xl font-bold">Total</span>
                          <span className="text-3xl font-bold text-orange-400">{totalPrice} €</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          {currentStep > 1 && (
            <Button
              onClick={prevStep}
              variant="outline"
              size="lg"
              className="flex-1 font-semibold"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Précédent
            </Button>
          )}
          
          {currentStep < 5 ? (
            <Button
              onClick={nextStep}
              size="lg"
              className={`${currentStep === 1 ? 'w-full' : 'flex-1'} bg-orange-500 hover:bg-orange-600 text-white font-semibold`}
            >
              Suivant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              size="lg"
              disabled={createBookingMutation.isPending}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
            >
              {createBookingMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Confirmation en cours...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Confirmer ma réservation
                </>
              )}
            </Button>
          )}
        </div>

        {currentStep === 5 && (
          <p className="text-center text-sm text-slate-600 mt-4">
            En confirmant, vous acceptez nos conditions générales de vente.
          </p>
        )}
      </div>
    </div>
  );
}
