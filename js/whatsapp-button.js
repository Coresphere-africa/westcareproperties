/**
 * WHATSAPP FLOATING BUTTON & UTILITIES
 * Adds WhatsApp contact button to all pages
 */

class WhatsAppButton {
    constructor(phoneNumber = '+254723466916') {
        this.phoneNumber = phoneNumber;
        this.createButton();
    }

    createButton() {
        // Check if button already exists
        if (document.getElementById('whatsapp-button-container')) {
            return;
        }

        const container = document.createElement('div');
        container.id = 'whatsapp-button-container';
        container.innerHTML = `
<style>
    #whatsapp-button-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999;
        font-family: Arial, sans-serif;
    }

    .whatsapp-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #25D366, #20BA5A);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
        transition: all 0.3s ease;
        text-decoration: none;
        color: white;
        font-size: 28px;
    }

    .whatsapp-button:hover {
        transform: scale(1.1);
        box-shadow: 0 12px 32px rgba(37, 211, 102, 0.6);
    }

    .whatsapp-button:active {
        transform: scale(0.95);
    }

    .whatsapp-tooltip {
        position: absolute;
        bottom: 70px;
        right: 0;
        background: #222;
        color: white;
        padding: 10px 15px;
        border-radius: 8px;
        white-space: nowrap;
        font-size: 14px;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s, visibility 0.3s;
        pointer-events: none;
    }

    .whatsapp-button:hover + .whatsapp-tooltip {
        opacity: 1;
        visibility: visible;
    }

    @media (max-width: 768px) {
        #whatsapp-button-container {
            bottom: 15px;
            right: 15px;
        }

        .whatsapp-button {
            width: 55px;
            height: 55px;
            font-size: 24px;
        }

        .whatsapp-tooltip {
            font-size: 12px;
            padding: 8px 12px;
        }
    }
</style>

<a href="https://wa.me/${this.phoneNumber.replace(/\D/g, '')}?text=Hello%20Westcare%20Properties%20Ltd%2C%20I%20would%20like%20to%20inquire%20about%20your%20services" 
   target="_blank" 
   rel="noopener noreferrer" 
   class="whatsapp-button" 
   title="Chat with us on WhatsApp">
    <i class="fab fa-whatsapp"></i>
</a>
<div class="whatsapp-tooltip">Chat with us on WhatsApp</div>
        `;
        document.body.appendChild(container);
    }
}

// Initialize WhatsApp button when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const branding = wcData ? wcData.getBranding() : { socialMedia: { whatsapp: '+254723466916' } };
        new WhatsAppButton(branding.socialMedia?.whatsapp || '+254723466916');
    });
} else {
    const branding = wcData ? wcData.getBranding() : { socialMedia: { whatsapp: '+254723466916' } };
    new WhatsAppButton(branding.socialMedia?.whatsapp || '+254723466916');
}
