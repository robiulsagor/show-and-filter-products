const data = [
    {
        id: 1,
        name: "Invicta Men's Pro Diver",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 11,
        name: "Invicta Men's Pro Diver 2",
        img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
        price: 74,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Timex Men's Expedition Scout ",
        img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
        price: 40,
        cat: "Sport",
    },
    {
        id: 3,
        name: "Breitling Superocean Heritage",
        img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
        price: 200,
        cat: "Luxury",
    },
    {
        id: 4,
        name: "Casio Classic Resin Strap ",
        img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
        price: 16,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Garmin Venu Smartwatch ",
        img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
        price: 74,
        cat: "Casual",
    },
];

const searchContainer = document.querySelector(".search")
const categoryContainer = document.querySelector(".cats")
const productsContainer = document.querySelector(".products")
const priceRange = document.querySelector(".priceRange")
const priceValue = document.querySelector(".priceValue")

let searchValue

const showProducts = (filterProducts) => {
    productsContainer.innerHTML = filterProducts.map(item =>
        ` <div class="product">
            <img src=${item.img} alt="">
            <p>${item.name} </p>
            <span>$${item.price}</span>
        </div>`)
}

const showCategories = () => {
    const allCategories = data.map(item => item.cat)

    const categories = ["All",
        ...allCategories.filter((item, i) => {
            return allCategories.indexOf(item) === i
        })]

    console.log(allCategories);
    console.log(categories);

    categoryContainer.innerHTML = categories.map(item =>
        `<span class = 'cat'>${item}</span>`).join("")

    categoryContainer.addEventListener("click", e => {
        const selectedCategory = e.target.textContent

        selectedCategory === "All" ? showProducts(data) :
            showProducts(data.filter(item => item.cat.toLowerCase() === selectedCategory.toLowerCase()))

    })
}

const handleSearch = () => {
    searchContainer.addEventListener("keyup", e => {
        searchValue = e.target.value.toLowerCase()

        if (searchValue) {
            showProducts(data.filter(item => item.name.toLowerCase().indexOf(searchValue) !== -1))
        } else {
            showProducts(data)
        }
    })
}

const setPrice = () => {
    const priceList = data.map(item => item.price)
    const minPrice = Math.min(...priceList)
    const maxPrice = Math.max(...priceList)

    priceRange.min = minPrice
    priceRange.max = maxPrice
    priceRange.value = maxPrice
    priceValue.textContent = "$" + maxPrice

    priceRange.addEventListener("input", e => {
        priceValue.textContent = "$" + e.target.value
        showProducts(data.filter(item => item.price <= e.target.value))
    })

    console.log(minPrice, maxPrice);
}



showProducts(data)
showCategories()
handleSearch()
setPrice()