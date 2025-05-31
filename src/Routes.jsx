import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import CreatorRegistrationOnboarding from "pages/creator-registration-onboarding";
import ContentUploadManagement from "pages/content-upload-management";
import FanMessagingCommunication from "pages/fan-messaging-communication";
import SubscriptionMonetizationManagement from "pages/subscription-monetization-management";
import FanProfileSubscriptionPortal from "pages/fan-profile-subscription-portal";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<FanProfileSubscriptionPortal />} />
          <Route path="/creator-registration-onboarding" element={<CreatorRegistrationOnboarding />} />
          <Route path="/content-upload-management" element={<ContentUploadManagement />} />
          <Route path="/fan-messaging-communication" element={<FanMessagingCommunication />} />
          <Route path="/subscription-monetization-management" element={<SubscriptionMonetizationManagement />} />
          <Route path="/fan-profile-subscription-portal" element={<FanProfileSubscriptionPortal />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;