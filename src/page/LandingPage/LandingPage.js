import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { Row, Col, Container } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../features/product/productSlice";
import ReactPaginate from "react-paginate";

const LandingPage = () => {
  const dispatch = useDispatch();

  const { productList, totalPageNum, loading } = useSelector(
    (state) => state.product
  );
  const [params, setParams] = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);
  const name = params.get("name") || "";

  useEffect(() => {
    dispatch(getProductList({ page, name }));
  }, [dispatch, page, name]);

  const handlePageClick = ({ selected }) => {
    setParams({ page: selected + 1, ...(name ? { name } : {}) });
  };

  return (
    <Container>
      <Row>
        {productList.length > 0 ? (
          productList.map((item) => (
            <Col md={3} sm={12} key={item._id}>
              <ProductCard item={item} />
            </Col>
          ))
        ) : (
          <div className="text-align-center empty-bag">
            {name === "" ? (
              <h2>등록된 상품이 없습니다!</h2>
            ) : (
              <h2>{name}과 일치한 상품이 없습니다!`</h2>
            )}
          </div>
        )}
      </Row>

      {totalPageNum > 1 && (
        <div className="display-center mb-5">
          <ReactPaginate
            pageCount={totalPageNum}
            forcePage={page - 1}
            onPageChange={handlePageClick}
            nextLabel="Next >"
            previousLabel="< Previous"
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            containerClassName="pagination display-center list-style-none"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      )}
    </Container>
  );
};

export default LandingPage;
