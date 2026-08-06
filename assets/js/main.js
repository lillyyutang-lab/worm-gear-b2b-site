const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));}

const whatsappNumber='8615262579178';
const whatsappGreeting="Hello SMK, I’m interested in your gearboxes and electric motors. Could you please recommend a suitable model and provide a quotation? Let’s discuss my requirements.";
const whatsappIcon='<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16.04 3C9.42 3 4.03 8.35 4.03 14.93c0 2.31.67 4.56 1.94 6.49L4 29l7.79-2.04a12.04 12.04 0 0 0 5.76 1.47h.01c6.62 0 12.01-5.35 12.01-11.93A11.86 11.86 0 0 0 16.04 3Zm0 2.02c5.5 0 9.98 4.45 9.98 9.91 0 5.47-4.48 9.92-9.98 9.92-1.86 0-3.67-.51-5.24-1.48l-.38-.23-4.62 1.21 1.23-4.48-.25-.4a9.82 9.82 0 0 1-1.52-5.23c0-5.47 4.48-9.92 9.98-9.92Zm-5.01 4.44c-.25 0-.65.1-.99.47-.34.37-1.3 1.27-1.3 3.09s1.33 3.58 1.52 3.83c.19.25 2.61 3.98 6.32 5.58.88.38 1.57.61 2.11.78.89.28 1.69.24 2.33.15.71-.11 2.18-.89 2.49-1.75.31-.86.31-1.6.22-1.75-.09-.16-.34-.25-.71-.44-.37-.19-2.18-1.08-2.52-1.2-.34-.12-.59-.19-.84.19-.25.37-.96 1.2-1.18 1.45-.22.25-.43.28-.81.09-.37-.19-1.57-.58-2.99-1.84-1.11-.98-1.85-2.2-2.07-2.57-.22-.37-.02-.57.16-.76.17-.17.37-.44.56-.65.19-.22.25-.37.37-.62.12-.25.06-.47-.03-.65-.09-.19-.84-2.01-1.15-2.75-.3-.73-.61-.63-.84-.64h-.72Z"/></svg>';
const quoteIcon='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 12.5 12 4h6.5a1.5 1.5 0 0 1 1.5 1.5V12l-8.5 8.5-8-8Z"/><circle cx="16.2" cy="7.8" r="1.25"/></svg>';

function ensureFloatingAction(className,ariaLabel,markup){
  let link=document.querySelector('.'+className);
  if(!link){
    link=document.createElement('a');
    link.className=className;
    document.body.appendChild(link);
  }
  link.href='https://wa.me/'+whatsappNumber;
  link.target='_blank';
  link.rel='noopener noreferrer';
  link.setAttribute('aria-label',ariaLabel);
  link.innerHTML=markup;
  return link;
}

ensureFloatingAction('whatsapp-float','Contact SMK on WhatsApp','<span class="float-icon">'+whatsappIcon+'</span><span class="sr-only">WhatsApp</span>');
ensureFloatingAction('quote-float','Get a free quote from SMK','<span>Get a Free Quote</span>'+quoteIcon);

document.querySelectorAll('a[href*="wa.me/"]').forEach((link)=>{
  const whatsappUrl=new URL(link.href);
  whatsappUrl.searchParams.set('text',whatsappGreeting);
  link.href=whatsappUrl.toString();
});
