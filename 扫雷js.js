function renderBoard(NumRows,NumCols){
    let boardElement=document.querySelector("#board");
    for (let i=0; i<NumRows; i++){
        let trElement=document.createElement("tr");
        for (let j=0; j<NumCols; j++){
            let tdElement=document.createElement("td");
            let Gezi=document.createElement("div");
            Gezi.className=("Gezi");
            tdElement.append(Gezi);
            
            trElement.append(tdElement);
        }
        boardElement.append(trElement);
    }
}
renderBoard(9,9)