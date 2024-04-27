const cartData = JSON.parse(localStorage.getItem('myCart')) || [];
const tbody = document.querySelector('tbody');


// in số lượng
countAmount() ;


if (cartData.length > 0) {
    controlCart(cartData);
} else {
    var tr = document.createElement('tr');
    tr.innerHTML = "<h4 style='color: red; margin-top :10px'>Giỏ hàng đang trống</h4>";
    tbody.appendChild(tr);
}

function controlCart(myCart) {
    var tongtien = 0;

    myCart.forEach((pro, index) => {
        const tr = document.createElement('tr');
        var thanhtien = pro.price * pro.quantity;
        tongtien += thanhtien;
        tr.innerHTML = `
            <td class="shoping__cart__item">
                <img src="${pro.image}" alt="" width ='100px'>
                <h5>${pro.name}</h5>
            </td>
            <td class="shoping__cart__price">
                ${pro.price.toLocaleString()}
            </td>
            <td class="shoping__cart__quantity">
                <div class="quantity">
                    <div class="pro-qty">
                        <input type="text" value="${pro.quantity}">
                    </div>
                </div>
            </td>
            <td class="shoping__cart__total">
                ${thanhtien.toLocaleString()}
            </td>
            <td class="shoping__cart__item__close">
                <span class="icon_close" onclick="deletePro(${index})"></span>
            </td>
        `;
        tbody.appendChild(tr);
    });
    document.querySelector('.total').innerHTML = tongtien.toLocaleString() ;
     // in số tiền 
     document.querySelector('#tongtien').innerText = tongtien.toLocaleString() + 'đ';  
}

// in số lượng
function countAmount() {
    let allAmount = 0 ;
cartData.forEach( item =>{
 allAmount+= item.quantity;
})
document.getElementById('amount').innerHTML = allAmount;
}

function deletePro(index) {
    cartData.splice(index, 1); // Sửa từ cart thành cartData
    localStorage.setItem('myCart', JSON.stringify(cartData));
    controlCart(cartData);
}
