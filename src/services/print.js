const print = (id) => {
    //console.log('print');  
    let printContents = document.getElementById(id).innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
}


export {print};
