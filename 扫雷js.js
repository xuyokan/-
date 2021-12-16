

function renderBoard(NumRows,NumCols,grid){                               //行数，列数，初始化的棋盘
    let boardElement=document.querySelector("#board");//扫雷棋盘
    
    for (let i=0; i < NumRows; i++){                
        let trElement=document.createElement("tr"); 
        
        for (let j=0; j < NumCols; j++){
            let tdElement=document.createElement("td");         //生成表格
            
            let Gezi=document.createElement("div");             //通过给div元素赋予类名后使用css生成格子   
            Gezi.className=("Gezi");
            if (grid[i][j].count===-1){
                Gezi.innerText="*"
            }else{
                Gezi.innerText=grid[i][j].count
            }
            
            
            Gezi.addEventListener("click",(e)=> {
                Gezi.classList.add("clear");
            });

            tdElement.append(Gezi);
            
            trElement.append(tdElement);                        //将生成的div元素装入td中，再将td 装入tr， 最后将tr装入棋盘中 
        }

        boardElement.append(trElement);
    }
    console.log("grid:",grid);
}
//扫雷棋盘主要部分

const directions=[
    [-1,-1],[-1,0],[-1,1],
    [ 0,-1],      [0, 1],
    [ 1,-1],[1,0],[1, 1],                                         //中心棋子一周的方向常量
]




function Chushihua(NumRows,NumCols,NumLei){
    let grid=new Array(NumRows);              
    
    for (let i=0; i < NumRows; i++) {
        grid[i]=new Array(NumCols);
        
        for (let j=0; j < NumCols; j++){    //给每个格赋0
            grid[i][j]={
                clear:false,
                count:0
            }
        
        }
    
    }
    

    let Lei=[]
    for (let k=0; k < NumLei; k++){
        let LeiNums= Math.trunc(Math.random()*NumRows*NumCols);
        let row=Math.trunc(LeiNums/NumCols);
        let col=LeiNums%NumCols                 //生成[row,col]位置的雷
        
        console.log("zuobiao",LeiNums,row,col)
        grid[row][col].count= -1;
        Lei.push([row,col]);                    //给雷格赋-1，入栈

    }
    console.log("lei:",Lei)



    for (let [row,col] of Lei){
        for (let [drow,dcol] of directions){
            let Gezirow=row + drow;
            let Gezicol=col + dcol;                             //雷格坐标
            
            if (Gezirow < 0 || Gezirow >= NumRows || Gezicol < 0 || Gezicol >= NumCols) {
                continue;                                               //跳出边框
            }
            
            
            if (grid[Gezirow][Gezicol].count===0){
                let count=0;
                for (let [arow,acol] of directions){
                    let NewGezirow=Gezirow+arow;
                    let NewGezicol=Gezicol+acol;                            //雷格一周依次的坐标
                    
                    if (NewGezirow < 0 || NewGezirow >= NumRows || NewGezicol < 0 || NewGezicol >= NumCols){
                        continue;                                            //跳出边框限制条件
                    }
                    
                    if (grid[NewGezirow][NewGezicol].count===-1){
                        count +=1;                                              //判断是否为雷 +1
                    }
                    //console.log("count:",count);
                }
                if (count > 0){
                    grid[Gezirow][Gezicol].count=count;                             //雷格周围的格一周的雷数
                }
            }
            
        }
           

    }




    return grid;

}



    



let grid=Chushihua(15,15,45);

renderBoard(15,15,grid);
