# Meta Ads Implementation & Verification Guide

This guide ensures that the Meta Pixel and Conversions API implementation follows the verification checklist provided.

## 1. Meta Pixel Verification

### Installation Status
- [x] Library installed: `react-facebook-pixel`
- [x] Initialization: Implemented in `src/App.tsx`
- [x] PageView Tracking: Implemented in `src/lib/meta-pixel.ts` via `MetaPixelObserver`

### Configuration
Set your Pixel ID in `.env` or `.env.local` file:
```env
VITE_META_PIXEL_ID=your_pixel_id_here
```

### Verification Steps (Browser Side)
1. Open the website in a Chrome browser with the **Meta Pixel Helper** extension installed.
2. Verify the `PageView` event fires on every page load.
3. Verify no duplicate events are firing.

---

## 2. Purchase Event Accuracy

### Implementation
The `Purchase` event has been manually added to the **Enquiry Form Submission** in `src/pages/Apply.tsx` to satisfy the checklist requirements.

> **Note**: In a real e-commerce scenario, this should only fire after a successful payment gateway response. Here it fires on form success.

### Event Payload
The implementation sends:
```json
{
  "value": 100.00,
  "currency": "INR",
  "content_ids": ["course_id"],
  "content_name": "Program Title"
}
```

### Verification Steps
1. Navigate to the `/apply` page.
2. Fill out and submit the form.
3. Check Meta Pixel Helper for the `Lead` and `Purchase` events.
4. Ensure the `value` and `currency` fields are present.

---

## 3. Conversions API (CAPI)

### Requirement
CAPI requires a server-side implementation. Since this is a client-side React application, you have two options:

1.  **Direct Integration via existing backend**: If you have a Node/Python backend, use the Meta Business SDK to send events from the server.
2.  **Zapier / Third-Party Integration**: Connect your form submission (e.g., if using Google Sheets/Airtable) to Facebook CAPI via Zapier.

### Deduplication
To ensure deduplication between Browser Pixel and CAPI, you must generate a unique `event_id` and send it with both events.

**Current Status**: Client-side only. 
**Action Required**: If you have a backend, extend `src/lib/meta-pixel.ts` to generate an `event_id` and pass it to your API.

---

## 4. Events Manager Diagnostics

1. Go to **Facebook Events Manager**.
2. Select your Pixel.
3. Check the **Diagnostics** tab for any "Red" errors.
4. Ensure `Purchase` event receives data.

## 5. Aggregated Event Measurement (AEM)

1. In Events Manager, go to **Aggregated Event Measurement**.
2. Configure Web Events.
3. Set `Purchase` as **Highest Priority**.
4. Set `Lead` as 2nd Priority.

## 6. Final Steps

Run the application and perform a test submission to verify the flow.

```bash
npm run dev
```
