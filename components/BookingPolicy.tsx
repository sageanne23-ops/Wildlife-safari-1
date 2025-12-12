import React from 'react';
import PageHeader from './PageHeader';

const BookingPolicy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader 
        title="Booking Policy" 
        subtitle="Transparent terms for a worry-free journey."
        image="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop"
      />

      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="prose prose-stone mx-auto">
          <h2 className="text-safari-800">1. Booking Confirmation</h2>
          <p>
            A deposit of 30% is required to secure your booking. The remaining balance must be paid 45 days prior to the tour start date. For last-minute bookings (within 45 days), full payment is required.
          </p>

          <h2 className="text-safari-800">2. Gorilla Permits</h2>
          <p>
            Gorilla trekking permits ($1,500 per person) must be paid in full at the time of booking to secure them with the Rwanda Development Board. These permits are non-refundable.
          </p>

          <h2 className="text-safari-800">3. Cancellation Policy</h2>
          <ul>
            <li>More than 60 days before travel: 10% administration fee charged.</li>
            <li>45-60 days before travel: 30% of total tour cost charged.</li>
            <li>15-44 days before travel: 50% of total tour cost charged.</li>
            <li>Less than 15 days: 100% of total tour cost charged.</li>
          </ul>

          <h2 className="text-safari-800">4. Travel Insurance</h2>
          <p>
            Comprehensive travel insurance is mandatory for all clients. It must cover personal injury, medical expenses, repatriation, and cancellation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingPolicy;
