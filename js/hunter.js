const loadPhone = async (searchText, isShowAll) => {
    const link = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await link.json();
    const phone = data.data
    // console.log(phone);
    displayPhones(phone, isShowAll)
}

const displayPhones = (phone, isShowAll) => {
    // console.log(phone)
    // step 1 sarch containerid
    const phoneContainer = document.getElementById('Phone-container')
    phoneContainer.textContent = '';
    
    // data not found
    if (!phone.length) {
        alert('data is not found')
    }

    // display show all button when there are 10 phone

    const showAllButton = document.getElementById('show-all-container')
    if (phone.length > 10 && !isShowAll) {
        showAllButton.classList.remove('hidden')
    }
    else { showAllButton.classList.add('hidden') }
    // console.log(isShowAll)

    // display frist 10 phone if not show all

    if (!isShowAll) {
        phone = phone.slice(0, 10)
    }

    phone.forEach(phone => {
        // console.log(phone);
        // step 2 creat a div
        const phoneCurd = document.createElement('div')
        phoneCurd.classList = `card card-compact bg-gray-300 p-4 shadow-xl`;
        // step 3 creat innerHtml

        phoneCurd.innerHTML = `<figure>
        <img
          src="${phone.image}"
          alt="Shoes" />
        </figure>
        <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>${phone.image}</p>
            <div class="card-actions justify-center">
          <button onclick="handleBtnDetails('${phone.slug}');show_details_modal.showModal()" class="btn btn-primary">Show details</button>
            </div>
        </div>

        `
        // step 4 append child

        phoneContainer.appendChild(phoneCurd)
    });
    // hide loading spiner
    toggoelSpiner(false)
}

const handleBtnDetails = async (id) => {
    // console.log(id)
    // loading phone details
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showTheModal(phone);

    // show_details_modal.showModal(phone);

}

// show the modal

const showTheModal = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt="">
    <p>${phone.slug}</p>
    <p>${phone.name}</p>
    <p>${phone.releaseDate}</p>
    <p>${phone.others.Bluetooth}</p>
    

    `

    show_details_modal.showModal();
}


const searchHandler = (isShowAll) => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText);
    toggoelSpiner(true)
    loadPhone(searchText, isShowAll);
}

const toggoelSpiner = (isLoader) => {
    const spineLoader = document.getElementById('spiner')
    if (isLoader) {
        spineLoader.classList.remove('hidden')
    }
    else { spineLoader.classList.add('hidden') }
}

const showAll = () => {
    searchHandler(true)

}


