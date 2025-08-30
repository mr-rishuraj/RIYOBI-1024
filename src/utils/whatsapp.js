export const handleWhatsAppContact = (customMessage = null) => {
  const defaultMessage = "Hi! I'm interested in Riyobi dhobi management services. Please provide more information.";
  const message = encodeURIComponent(customMessage || defaultMessage);
  const phoneNumber = "9131786701"; // Replace with your actual WhatsApp number
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
};