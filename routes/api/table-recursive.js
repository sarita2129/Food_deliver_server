const multiplicationTables = function(n){
  // for(let i = 1; i<=12 ; i++)
  // {
  //     console.log(`${i}\tx\t12 = ${i * 12}`);
  // }
  let i = n;
  if(i<=12)
  {
    console.log(`${i}\tx\t12 = ${i * 12}`);
    i += 1;
    multiplicationTables(i);
  }
}

multiplicationTables(1);
