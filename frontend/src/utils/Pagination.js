import React from "react";
import PaginationBS from "react-bootstrap/Pagination";
import style from "./Pagination.module.css";

export default function Pagination (props) {
    const items = [];
    let lowLimit = props.curPage - Math.floor(props.shownElemNum/2);
    let highLimit = props.curPage + Math.floor(props.shownElemNum/2);
    if (lowLimit <= 0) {
        highLimit = props.shownElemNum;
    } else if (highLimit >= props.elemNumber) {
        lowLimit = props.elemNumber - props.shownElemNum + 1;
    }
    for (let i = 0; i < props.elemNumber; i++) {
        let active = false;
        if (i + 1 === props.curPage)
            active = true;
        if (props.shownElemNum < props.elemNumber) {
            if (lowLimit <= i + 1 && i + 1 <= highLimit) {
                items.push(
                    <PaginationBS.Item key={items.length} active={active} onClick={() => props.changePage(i + 1)}>
                        {i + 1}
                    </PaginationBS.Item>);
            } else if (i === 0) {
                items.push(
                    <PaginationBS.Item key={items.length} active={active} onClick={() => props.changePage(i + 1)}>
                        {i + 1}
                    </PaginationBS.Item>);
            } else if (i + 1 === props.elemNumber) {
                items.push(
                    <PaginationBS.Item key={items.length} active={active} onClick={() => props.changePage(i + 1)}>
                        {i + 1}
                    </PaginationBS.Item>);
            } else {
                if (lowLimit - 1 === i + 1 || highLimit + 1 === i + 1)
                    items.push(
                        <PaginationBS.Item key={items.length} active={active} disabled>
                            ...
                        </PaginationBS.Item>);
            }
        } else {
            items.push(
                <PaginationBS.Item key={items.length} active={active} onClick={() => props.changePage(i + 1)}>
                    {i + 1}
                </PaginationBS.Item>);
        }
    }
    if (props.showArrows) {
        if (props.curPage !== 1)
            items.unshift(
                <PaginationBS.Item key={items.length} onClick={() => props.changePage(props.curPage - 1)}>
                    &lt;
                </PaginationBS.Item>)
        if (props.curPage !== props.elemNumber && props.elemNumber !== 0)
            items.push(
                <PaginationBS.Item key={items.length} onClick={() => props.changePage(props.curPage + 1)}>
                    &gt;
                </PaginationBS.Item>)
    }
    return (
        <PaginationBS className={`${style.pagination} justify-content-center`} size='sm'>
            {items}
        </PaginationBS>
    )
}
