function PrintProduct(id, name, price, stock, cities, rating)
{
  document.write(`
    Product Id : ${id} <br>
    Name: ${name} <br>
    Price: ${price} <br>
    Stock : ${(stock==true)?"Available":"Out of Stock"} <br>
    Shipped To: ${cities.toString()} <br>
    Rating : ${rating.rate} <br>
    From: ${rating.count}
  `);
}
PrintProduct(101, "Samsung TV", 56000.55, true, ['Delhi', 'Hyd'], {rate:4.3, count:500});
