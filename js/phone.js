// getting the data from the api server.

const phoneData = async (searchText = 'Iphone', isShowAll) => { // to fetch all data from server, the (isShowAll) parameter 
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`) // dynamic url with parameter, coming from the input search field
        const data = await res.json()
        const phones = data.data
        displayPhones(phones, isShowAll) // to fetch all data from server, the (isShowAll) parameter 
    }
    catch {
        console.error('something is not working')
    }
}

// displaying the api date to the dom
const displayPhones = (phones, isShowAll) => { // to fetch all data from server, the (isShowAll) parameter
    const productContainer = document.getElementById('product-container')
    productContainer.textContent = ''; // clearing the preview products

    // displaying a button to show the rest of the product.
    const showingSome = document.getElementById('show-all-products')
    // the condition based on if there is more then 10 product the button will appeared else disappeared
    if (phones.length > 12 && !isShowAll) {
        showingSome.classList.remove('hidden')
    }
    else {
        showingSome.classList.add('hidden')
    }

    // console.log(isShowAll) // taking all data from tha server

    // the condition is about id the show all button clicked, all data will shod. else, 12 data will show
    if (!isShowAll) {
        phones = phones.slice(0, 12)// displaying some products if there is more then 10,
    }




    // looping data and injection to dom
    phones.forEach(phone => {
        const productCard = document.createElement('div')

        productCard.classList = `card w-full lg:w-[30%] bg-base-100 shadow-xl border-2 p-5`
        productCard.innerHTML = `
            <figure class="p-10 bg-secondary">
                <img src="${phone.image}" alt="Shoes" class="rounded-xl">
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title sub-title-color text-2xl">${phone.phone_name}</h2>
                <p class="text[18px] text-color font-semibold">Brand: ${phone.brand}</p>
                <p class="font-semibold">$999</p>
                <div class="card-actions">
                    <button onclick="productDtails('${phone.slug}')" class="btn text-xl bg-primary text-white border-none">Show Details</button>
                </div>
            </div>`
        productContainer.appendChild(productCard)
    });
    theLoadingSpinner(false) // to stop the spinner, when the data is loaded
}

// showing the details of a single product.
const productDtails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const singlePhoneData = data.data
    productTheDetailModal(singlePhoneData)

}

// showing the productdetail modal
const productTheDetailModal = (phone) => {
    product_detail_modal.showModal()

    const modalContainer = document.getElementById('product_detail_modal')
    const innerElement = document.createElement('div')
    innerElement.classList = `modal-box p-6`
    innerElement.innerHTML = `
    <figure class="p-10 bg-secondary flex justify-center items-center">
        <img  src="${phone.image}" alt="Shoes" class="rounded-xl">
    </figure>
    <h3 class="font-bold text-lg mt-4">${phone.name}</h3>
    <p class="my-4">It is a long established fact that a reader will be distracted by the readable content
    of a page when looking at its layout.</p>
    <p class="mb-2"><span class="font-bold">Storage:</span> ${phone.mainFeatures.storage}</p>
    <p class="mb-2"><span class="font-bold">Display Size:</span> ${phone.mainFeatures.displaySize}</p>
    <p class="mb-2"><span class="font-bold">Chipset:</span> ${phone.mainFeatures.chipSet}</p>
    <p class="mb-2"><span class="font-bold">Memory:</span> ${phone.mainFeatures.memory}</p>
    <p class="mb-2"><span class="font-bold">Slug:</span> ${phone.mainFeatures.slug}</p>
    <p class="mb-2"><span class="font-bold">Release data:</span> ${phone.releaseDate}</p>
    <p class="mb-2"><span class="font-bold">Brand:</span> ${phone.brand}</p>
    <p class="mb-2"><span class="font-bold">GPS:</span> ${phone.others?.GPS || 'NO GPS AVAILABLE '} </p>  <!-- its good use a potional chaining here. so if the object data is missing, nothing will happen -->
    <div class="modal-action">
        <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn text-white bg-[#DC3545]">Close</button>
        </form>
    </div>`
    modalContainer.appendChild(innerElement)
}


// search handler
const searchHandler = (isShowAll) => { // to fetch all data from server, the parameter
    theLoadingSpinner(true) // calling the spinner function
    const searchInput = document.getElementById('search-input').value
    phoneData(searchInput, isShowAll)
}


// the loading spinner
const theLoadingSpinner = (isLoading) => {
    const spinner = document.getElementById('spinner')
    if (isLoading) {
        spinner.classList.remove('hidden')
    }
    else {
        spinner.classList.add('hidden')
    }

}

// show all product button handling
const showAllProducts = () => {
    searchHandler(true) // to fetch all data from server
}

phoneData()