// Google Analytics 4: central tracking for every page that loads this shared script.
const gaMeasurementId='G-PTT0KLBYK6';
window.dataLayer=window.dataLayer||[];
window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};
window.gtag('js',new Date());
window.gtag('config',gaMeasurementId);

let gaScriptRequested=false;

function loadGoogleAnalytics(){
  if(gaScriptRequested||document.querySelector('script[data-smk-ga4]')) return;
  gaScriptRequested=true;
  const gaScript=document.createElement('script');
  gaScript.async=true;
  gaScript.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(gaMeasurementId);
  gaScript.dataset.smkGa4='true';
  document.head.appendChild(gaScript);
}

// Load immediately so outbound clicks are not lost when the browser leaves the page.
// The library remains asynchronous and does not block page rendering.
loadGoogleAnalytics();

function trackAnalyticsEvent(eventName,eventParameters){
  loadGoogleAnalytics();
  window.gtag('event',eventName,Object.assign({
    transport_type:'beacon'
  },eventParameters||{}));
}

window.trackAnalyticsEvent=trackAnalyticsEvent;

document.addEventListener('click',(event)=>{
  const link=event.target.closest('a');
  if(!link) return;

  const href=link.getAttribute('href')||'';
  const label=(link.textContent||link.getAttribute('aria-label')||'').trim().replace(/\s+/g,' ').slice(0,100);
  const pagePath=window.location.pathname;

  const isQuoteLink=link.classList.contains('quote-float')||/get a (free )?quote|request a quote|request selection support|send (motor )?requirements/i.test(label);
  const isWhatsAppLink=href.includes('wa.me/')||link.classList.contains('whatsapp-link')||link.classList.contains('whatsapp-float');

  if(isQuoteLink){
    trackAnalyticsEvent('quote_click',{link_text:label,page_path:pagePath,destination:href});
  }

  if(isWhatsAppLink){
    trackAnalyticsEvent('whatsapp_click',{link_text:label,page_path:pagePath,destination:href});
    return;
  }

  if(/^mailto:/i.test(href)){
    trackAnalyticsEvent('email_click',{link_text:label,page_path:pagePath,destination:href.split('?')[0]});
    return;
  }

  if(/linkedin\.com/i.test(href)){
    trackAnalyticsEvent('linkedin_click',{link_text:label,page_path:pagePath,destination:href});
    return;
  }

  if(/\.pdf(?:$|[?#])/i.test(href)){
    trackAnalyticsEvent('catalog_download',{file_name:href.split('/').pop().split(/[?#]/)[0],link_text:label,page_path:pagePath});
    return;
  }

  if(/(?:^|\/)product-[^/?#]+\.html(?:$|[?#])/i.test(href)){
    trackAnalyticsEvent('product_detail_click',{product_page:href.split(/[?#]/)[0],link_text:label,page_path:pagePath});
  }
});

// Record product detail views using GA4's recommended ecommerce event.
const productPageMatch=window.location.pathname.match(/\/product-([^/]+)\.html$/i);
if(productPageMatch){
  const productHeading=document.querySelector('main h1, main h2, .product-hero h1, .product-hero h2');
  const productName=(productHeading&&productHeading.textContent||document.title).trim().replace(/\s+/g,' ').slice(0,150);
  trackAnalyticsEvent('view_item',{
    page_path:window.location.pathname,
    items:[{
      item_id:productPageMatch[1],
      item_name:productName,
      item_brand:'SMK Transmission',
      item_category:'Industrial Power Transmission'
    }]
  });
}

// Measure genuine form engagement once, without treating an attempted submit as a lead.
document.querySelectorAll('form').forEach((form)=>{
  form.addEventListener('focusin',()=>{
    if(form.dataset.gaFormStarted==='true') return;
    form.dataset.gaFormStarted='true';
    trackAnalyticsEvent('inquiry_form_start',{
      form_id:form.id||'',
      form_name:form.getAttribute('name')||form.id||'website_form',
      page_path:window.location.pathname
    });
  },{once:true});
});

const toggle=document.querySelector('.mobile-toggle');
const menu=document.querySelector('.menu');
if(toggle&&menu){toggle.addEventListener('click',()=>menu.classList.toggle('open'));}

// Use one consistent red PDF icon for every navigation catalog link.
const catalogNavIcon='<svg class="catalog-nav-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm-1 7V3.5L18.5 9H13ZM8 13h3a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-1v2H8v-5Zm2 1v1h1v-1h-1Zm3-1h2a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2v-5Zm2 2h-1v1h1v-1Zm2-2h3v1h-1v1h1v1h-1v2h-2v-5Z"/></svg>';
document.querySelectorAll('.menu a[href$=".pdf"]').forEach((link)=>{
  link.querySelectorAll('svg').forEach((icon)=>icon.remove());
  link.classList.add('catalog-nav-link');
  link.insertAdjacentHTML('afterbegin',catalogNavIcon);
});

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


// Accessible back-to-top control shared by every page.
const backToTop=document.createElement('button');
backToTop.className='back-to-top';
backToTop.type='button';
backToTop.setAttribute('aria-label','Back to top');
backToTop.setAttribute('title','Back to top');
backToTop.innerHTML='<span aria-hidden="true">&#8593;</span>';
document.body.appendChild(backToTop);

const updateBackToTop=()=>{
  backToTop.classList.toggle('is-visible',window.scrollY>400);
};
window.addEventListener('scroll',updateBackToTop,{passive:true});
updateBackToTop();
backToTop.addEventListener('click',()=>{
  window.scrollTo({top:0,behavior:'smooth'});
});


function loadDeferredHeroVideo(){
  const video=document.querySelector('.hero-video');
  const source=video&&video.querySelector('source[data-src]');
  if(!video||!source||!window.matchMedia('(min-width: 769px)').matches) return;

  const connection=navigator.connection||navigator.mozConnection||navigator.webkitConnection;
  const effectiveType=connection&&connection.effectiveType||'';
  if(connection&&connection.saveData) return;
  if(effectiveType==='slow-2g'||effectiveType==='2g') return;

  source.src=source.dataset.src;
  source.removeAttribute('data-src');
  video.addEventListener('canplay',()=>video.classList.add('is-ready'),{once:true});
  video.load();
  const playPromise=video.play();
  if(playPromise&&typeof playPromise.catch==='function'){
    playPromise.catch(()=>{});
  }
}

window.addEventListener('load',()=>{
  if('requestIdleCallback' in window){
    window.requestIdleCallback(loadDeferredHeroVideo,{timeout:4000});
  }else{
    window.setTimeout(loadDeferredHeroVideo,2000);
  }
},{once:true});
