import React from "react";

interface PaginationInterface {
    currentPage: number;
    totalPages: number;
    paginate: any;
}

export const Pagination: React.FC<PaginationInterface>=(props)=>{

    const listPages = [];

    if(props.currentPage===1) {
        listPages.push(props.currentPage);
        if (props.totalPages >= props.currentPage + 1) {
            listPages.push(props.currentPage + 1);
        }
        if (props.totalPages >= props.currentPage + 2) {
            listPages.push(props.currentPage + 2);
        }
    } else if(props.currentPage>1) {
        //page -2
        if(props.currentPage>=3) {
            listPages.push(props.currentPage - 2);
        }
        //page -1
        if(props.currentPage>=2) {
            listPages.push(props.currentPage - 1);
        }
        //current page
        listPages.push(props.currentPage);
        //page +1
        if (props.totalPages >= props.currentPage + 1) {
            listPages.push(props.currentPage + 1);
        }
        //page +2
        if (props.totalPages >= props.currentPage + 2) {
            listPages.push(props.currentPage + 2);
        }
    }

    return (
        <nav aria-label="...">
            <ul className="pagination">
                <li className="page-item" onClick={()=>props.paginate(1)}>
                    <button className="page-link" >
                        Trang Đầu
                    </button>
                </li>
                {
                    listPages.map(page => (
                        <li className="page-item" key={page} onClick={()=>props.paginate(page)}>
                            <button className={"page-link " + (props.currentPage===page?"active":"")}>
                                {page}
                            </button>
                        </li>
                    ))
                }
                <li className="page-item" onClick={()=>props.paginate(props.totalPages)}>
                    <button className="page-link" >
                        Trang Cuối
                    </button>
                </li>
            </ul>
        </nav>
    );
}