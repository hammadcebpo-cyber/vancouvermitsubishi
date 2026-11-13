import { useState } from 'react';
import { AboutSection } from './components/AboutSection.tsx';
import { BackToTop } from './components/BackToTop.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { FinancingSection } from './components/FinancingSection.tsx';
import { Footer } from './components/Footer.tsx';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { InventoryShowcase } from './components/InventoryShowcase.tsx';
import { MitsubishiExperience } from './components/MitsubishiExperience.tsx';
import {
  LegalModal,
  QuoteRequestModal,
  ServiceAppointmentModal,
  VehicleDetailsModal,
} from './components/Modals.tsx';
import { ServicePartsSection } from './components/ServicePartsSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { WhyVancouverMitsubishi } from './components/WhyVancouverMitsubishi.tsx';
import type {
  InquiryDepartment,
  InventoryItem,
  MitsubishiModelName,
  QuoteInquiryType,
  VehicleCategory,
} from './types/dealership.ts';

export default function App() {
  // Inventory filter state
  const [selectedCategory, setSelectedCategory] = useState<'All Vehicles' | VehicleCategory>(
    'All Vehicles'
  );
  const [selectedModel, setSelectedModel] = useState<'All Models' | MitsubishiModelName>(
    'All Models'
  );

  // Vehicle Details Modal
  const [activeVehicle, setActiveVehicle] = useState<InventoryItem | null>(null);

  // Quote / Offers / Financing / Trade-in Modal
  const [quoteModalState, setQuoteModalState] = useState<{
    isOpen: boolean;
    modelName: string;
    category: string;
    inquiryType: QuoteInquiryType;
    notes: string;
  }>({
    isOpen: false,
    modelName: 'Mitsubishi Lineup',
    category: 'New Vehicles',
    inquiryType: 'Vehicle Quote',
    notes: '',
  });

  // Service Appointment Modal
  const [serviceModalState, setServiceModalState] = useState<{
    isOpen: boolean;
    serviceType: string;
  }>({
    isOpen: false,
    serviceType: 'Routine Maintenance',
  });

  // Legal Modal
  const [legalDoc, setLegalDoc] = useState<'privacy' | 'terms' | null>(null);

  // Contact form prefill state
  const [contactDepartment, setContactDepartment] = useState<InquiryDepartment>('Sales');
  const [contactSubject, setContactSubject] = useState<string>('');

  const handleOpenQuoteModal = (
    modelName: string,
    category: string,
    inquiryType: QuoteInquiryType,
    notes = ''
  ) => {
    setActiveVehicle(null);
    setQuoteModalState({
      isOpen: true,
      modelName,
      category,
      inquiryType,
      notes,
    });
  };

  const handleJumpToContact = (department: InquiryDepartment, subject = '') => {
    setContactDepartment(department);
    setContactSubject(subject);
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#101010]">
      <Header
        onSelectInventoryCategory={(category) => {
          setSelectedCategory(category);
          setSelectedModel('All Models');
        }}
        onOpenOffersInquiry={() =>
          handleOpenQuoteModal(
            'Current Mitsubishi Offers',
            'Sales & Offers',
            'Current Offers',
            'Please share current dealership and manufacturer offers available in Vancouver.'
          )
        }
      />

      <main className="flex-1">
        <Hero
          onSelectInventoryCategory={(category) => {
            setSelectedCategory(category);
            setSelectedModel('All Models');
          }}
        />

        <InventoryShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedModel={selectedModel}
          onSelectModel={setSelectedModel}
          onViewDetails={(item) => setActiveVehicle(item)}
          onRequestQuote={(item) =>
            handleOpenQuoteModal(item.title, item.category, 'Vehicle Quote')
          }
          onOpenOffersInquiry={() =>
            handleOpenQuoteModal(
              'Current Mitsubishi Offers',
              'Sales & Offers',
              'Current Offers',
              'Please share current offers and showroom availability.'
            )
          }
        />

        <WhyVancouverMitsubishi />

        <MitsubishiExperience
          onSelectModelInInventory={(model) => {
            setSelectedCategory('All Vehicles');
            setSelectedModel(model);
          }}
          onRequestModelInfo={(modelName) =>
            handleOpenQuoteModal(
              modelName,
              'Model Information',
              'Vehicle Quote',
              `Requesting verified model specifications, trims, and availability for ${modelName}.`
            )
          }
        />

        <FinancingSection
          onOpenFinancingModal={(inquiryType, presetNotes = '') =>
            handleOpenQuoteModal(
              inquiryType === 'Trade-In Valuation'
                ? 'Vehicle Trade-In Appraisal'
                : 'Mitsubishi Financing Options',
              'Financing',
              inquiryType,
              presetNotes
            )
          }
        />

        <ServicePartsSection
          onBookService={(defaultServiceType = 'Routine Maintenance') =>
            setServiceModalState({ isOpen: true, serviceType: defaultServiceType })
          }
          onContactServiceTeam={(dept = 'Service') =>
            handleJumpToContact(
              dept,
              dept === 'Parts'
                ? 'Genuine Mitsubishi Parts & Accessories Inquiry'
                : 'Mitsubishi Service Department Inquiry'
            )
          }
        />

        <TestimonialsSection />

        <AboutSection
          onGetToKnowUs={() =>
            handleJumpToContact('Sales', 'Getting to know Vancouver Mitsubishi')
          }
        />

        <ContactSection
          preferredDepartment={contactDepartment}
          preferredSubject={contactSubject}
        />
      </main>

      <Footer
        onSelectInventoryCategory={(category) => {
          setSelectedCategory(category);
          setSelectedModel('All Models');
        }}
        onContactDepartment={handleJumpToContact}
        onOpenLegalModal={setLegalDoc}
      />

      <BackToTop />

      {/* Interactive Modals */}
      <VehicleDetailsModal
        vehicle={activeVehicle}
        onClose={() => setActiveVehicle(null)}
        onRequestQuote={(vehicle, inquiryType) =>
          handleOpenQuoteModal(vehicle.title, vehicle.category, inquiryType)
        }
      />

      <QuoteRequestModal
        isOpen={quoteModalState.isOpen}
        initialModelName={quoteModalState.modelName}
        initialCategory={quoteModalState.category}
        initialInquiryType={quoteModalState.inquiryType}
        initialNotes={quoteModalState.notes}
        onClose={() => setQuoteModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      <ServiceAppointmentModal
        isOpen={serviceModalState.isOpen}
        initialServiceType={serviceModalState.serviceType}
        onClose={() => setServiceModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      <LegalModal doc={legalDoc} onClose={() => setLegalDoc(null)} />
    </div>
  );
}
