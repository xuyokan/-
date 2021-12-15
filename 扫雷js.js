

function renderBoard(NumRows,NumCols,grid){
    let boardElement=document.querySelector("#board");
    
    for (let i=0; i < NumRows; i++){
        let trElement=document.createElement("tr");
        
        for (let j=0; j < NumCols; j++){
            let tdElement=document.createElement("td");
            
            let Gezi=document.createElement("div");
            Gezi.className=("Gezi");
            Gezi.innerText=grid[i][j]

            tdElement.append(Gezi);
            trElement.append(tdElement);
        }

        boardElement.append(trElement);
    }
}
//扫雷棋盘主要部分


function Chushihua(NumRows,NumCols,NumLei){
    let grid=new Array(NumRows);              //给每个格赋0
    
    for (let i=0; i < NumRows; i++) {
        grid[i]=new Array(NumCols);
        
        for (let j=0; j < NumCols; j++){
            grid[i][j]=0;
        
        }
    
    }
    

    let Lei=[]
    for (let k=0; k < NumLei; k++){
        let LeiNums= Math.trunc(Math.random()*NumRows*NumCols);
        let row=Math.trunc(LeiNums/NumCols);
        let col=LeiNums%NumCols
        
        console.log(LeiNums,row,col)
        grid[row][col]= -1;
        Lei.push([row,col]);

    }
    console.log(Lei)



    for (let [row,col] of Lei){
        for (let [drow,dcol] of directions){
            let Gezirow=row + drow;
            let Gezicol=col + dcol;
            if (grid[Gezirow][Gezicol]==0){
                for (let [arow,acol] of directions){
                    

                }

            }
        }

    }




    return grid;

}




const directions=[
    [-1,-1],[0,-1],[1,-1],
    [-1, 0],      ,[1, 0],
    [-1, 1],[0, 1],[1, 1]
]
    



let grid=Chushihua(15,15,45);

renderBoard(15,15,grid);
