const steps = document.querySelectorAll(".steps");
const circleSteps = document.querySelectorAll(".step__circle");
const formInputs = document.querySelectorAll(".step-1 form input")
const plans = document.querySelectorAll(".step-2__plan-card");
const switcher = document.querySelector(".switch");
const addons = document.querySelectorAll(".step-3__box");
const total = document.querySelector(".step-4__selection-box__total b");
const planPrice = document.querySelector(".step-4__plan-price");

console.log(formInputs)

let time; 
let currentStep = 1;
let currentCircle = 0;
const obj = {
  plan: null,
  kind: null,
  price: null,
};


function summary(obj) {
  const planName = document.querySelector(".step-4__plan-name");
  const planPrice = document.querySelector(".step-4__plan-price")
  console.log(" object planPrice:", obj.price.innerText);
  planPrice.innerHTML = `${obj.price.innerText}`;
  planName.innerHTML = `${obj.plan.innerText} (${obj.kind ? "yearly" : "monthly"})`;
  console.log("planName:", planName.innerText);
 
}


function validateForm() {
  let valid = true;
  for (let i = 0; i < formInputs.length; i++) {
  
    if (!formInputs[i].value) {
      valid = false;
      formInputs[i].classList.add("err");
      findLabel(formInputs[i]).nextElementSibling.style.display = "flex";
      return valid;
    } else {
      valid = true;
      formInputs[i].classList.remove("err");
     
      findLabel(formInputs[i]).nextElementSibling.style.display = "none";
    }
  }
  return valid;
}

function findLabel(el) {
  const idVal = el.id;
  const labels = document.getElementsByTagName("label");

  for (let i = 0; i < labels.length; i++) {
    if(labels[i].htmlFor == idVal) return labels[i];
    
  }
}




steps.forEach( step => { 
  const nextBtn = step.querySelector(".steps__next-step");
  const prevBtn = step.querySelector(".steps__prev-step");

  if(prevBtn) {
    prevBtn.addEventListener("click", () => {
      document.querySelector(`.step-${currentStep}`).style.display = "none";
      currentStep--;
      document.querySelector(`.step-${currentStep}`).style.display = "flex"
      circleSteps[currentCircle].remove("active")
      currentCircle--;

    })
  }

  nextBtn.addEventListener("click", () => {
    document.querySelector(`.step-${currentStep}`).style.display = "none"
    if (currentStep < 5 && validateForm() ) {
      currentStep++;
      currentCircle++;
      setTotal();
    }
    document.querySelector(`.step-${currentStep}`).style.display= "flex";
    circleSteps[currentCircle].classList.add("active");
    summary(obj)
  })
})


plans.forEach( (plan) => {
  plan.addEventListener("click", () => {
    document.querySelector(".selected").classList.remove("selected");
    plan.classList.add("selected")
    const planName = plan.querySelector("b");
    const planPrice = plan.querySelector(".step-2__plan-card-price");
    obj.plan = planName;
    obj.price = planPrice;
  })
})


switcher.addEventListener("click", () => {
  const val = switcher.querySelector("input").checked;
  if (val) {
    document.querySelector(".monthly").classList.remove("sw-active");
    document.querySelector(".yearly").classList.add("sw-active");
  } else {
    document.querySelector(".monthly").classList.add("sw-active");
    document.querySelector(".yearly").classList.remove("sw-active");
  }
  switchPrice(val)
  obj.kind = val; 
})

addons.forEach( (addon) => {
  addon.addEventListener("click", (e) => {
    const addonSelect = addon.querySelector("input");
    const ID = addon.getAttribute("data-id");
    if (addonSelect.checked){
      addonSelect.checked = false; 
      addon.classList.remove("ad-selected");
      showAddon(ID, false);
    } else {
      addonSelect.checked = true;
      addon.classList.add("ad-selected");
      console.log(`Class list of addon ${addon.classList}`)
      showAddon(addon, true)
      e.preventDefault();
    }
  })
})

function switchPrice(checked) {
  const yearlyPrice = [90, 120, 150];
  const monthlyPrice = [9, 12, 15];
  const prices = document.querySelectorAll(".step-2__plan-card-price");
  if (checked) {
    prices[0].innerHTML = `${yearlyPrice[0]}/yr`
    prices[1].innerHTML = `${yearlyPrice[1]}/yr`
    prices[2].innerHTML = `${yearlyPrice[2]}/yr`
    setTime(true);
  } else {
    prices[0].innerHTML = `${monthlyPrice[0]}/mo`
    prices[1].innerHTML = `${monthlyPrice[1]}/mo`
    prices[2].innerHTML = `${monthlyPrice[2]}/mo`
    setTime(false);
  }
}

function showAddon(ad, val) {
  console.log(`ad from show addon ${ad}\n val from addon ${val}`)
  const temp = document.getElementsByTagName("template")[0];
  const clone = temp.content.cloneNode(true);
  const serviceName = clone.querySelector(".step-4__selected-addon__service-name");
  const servicePrice = clone.querySelector(".step-4__selected-addon__service-price");
  const serviceID = clone.querySelector(".step-4__selected-addon");
  if (ad && val) {
    serviceName.innerText = ad.querySelector("label").innerText;
    servicePrice.innerText = ad.querySelector(".price").innerText;
    serviceID.setAttribute("data-id", ad.dataset.id);
    document.querySelector(".step-4__addons").appendChild(clone);
  } else {
    const addons = document.querySelectorAll(".step-4__selected-addon")
    addons.forEach((addon) => {
      const attr = addon.getAttribute("data-id");
      if (attr == ad) {
        addon.remove();
      }
    })
  } 
}

function setTotal() {
  const str = planPrice.innerHTML;
  const res = str.replace(/\D/g, "");
  const addonPrices = document.querySelectorAll(".step-4__selected-addon__service-price");
  let val = 0;
  for (let i = 0; i < addonPrices.length; i++) {
  const str = addonPrices[i].innerHTML;
  const res = str.replace(/\D/g, "");
    val += Number(res);
  }

  total.innerHTML = `$${val + Number(res)}/${time?"yr":"mo"}`;
  console.log(` total price - ${total.innerText}`)
}


function setTime(t) {
  return time = t;
}