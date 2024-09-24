const loadPhone = async (searchText,isShowAll) => {
    const link = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await link.json();
    const phone = data.data
    // console.log(phone);
    displayPhones(phone,isShowAll)
}

const displayPhones = (phone,isShowAll) => {
    // console.log(phone)
    // step 1 sarch containerid
    const phoneContainer = document.getElementById('Phone-container')
    phoneContainer.textContent='';

    // display show all button when there are 10 phone

    const showAllButton = document.getElementById('show-all-container')
    if(phone.length > 10 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }
    else{showAllButton.classList.add('hidden')}
    console.log(isShowAll)

    // display frist 10 phone if not show all

    if(!isShowAll){
        phone = phone.slice(0,10)
    }

    phone.forEach(phone => {
        console.log(phone);
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
        <p>${phone.slug}</p>
            <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>

        `
        // step 4 append child

        phoneContainer.appendChild(phoneCurd)
    });
    toggoelSpiner(false)
}

const searchHandler = (isShowAll) =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    // console.log(searchText);
    toggoelSpiner(true)
    loadPhone(searchText,isShowAll);
}

const toggoelSpiner = (isLoader) => {
    const spineLoader = document.getElementById('spiner')
    if(isLoader){
        spineLoader.classList.remove('hidden')
    }
    else{spineLoader.classList.add('hidden')}
}

const showAll = () => {
    searchHandler(true)

}


