import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import CatalogCard from "../../components/CatalogCard/CatalogCard";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import { Paginate } from "../../models/paginate";
import { GetListEducationProgramResponse } from "../../models/responses/educationProgram/getListEducationProgramResponse";
import educationProgramService from "../../services/educationProgramService";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Col, Pagination } from "react-bootstrap";
import "./CatalogPage.css";

export default function CatalogPage() {
    const [educationPrograms, setEducationPrograms] = useState<Paginate<GetListEducationProgramResponse>>();


    const authState = useSelector((state: any) => state.auth);
    const [pageIndexState, setPageIndexState] = useState<any>(0)
    const location = useLocation();
    const pathArray = location.pathname.split('/');
    const lastPathSegment = pathArray[pathArray.length - 1];

    useEffect(() => {
        getEducationPrograms();
    }, [])

    useEffect(() => {
        if (pageIndexState !== undefined) {
            educationProgramService.getAll(pageIndexState, 12).then(result => {
                setEducationPrograms(result.data);
            });
        }
    }, [pageIndexState]);

    const handleDataFromChild = (dataFromChild: any) => {
        educationProgramService.getByFilter(dataFromChild).then((result) => {
            setEducationPrograms(result.data);
        })
    };


    const getEducationPrograms = () => {
        educationProgramService.getAll(0, 100).then(result => {
            setEducationPrograms(result.data);
        })
    }

    function changePageIndex(pageIndex: any) {
        setPageIndexState(pageIndex);
    }

    const handleInputFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value.toLowerCase();

        if (educationPrograms) {
            if (searchText.length > 0) {
                const newFilteredItems = educationPrograms.items.filter(educationProgram =>
                    educationProgram.name.toLowerCase().includes(searchText)
                );
                const filteredItems: Paginate<GetListEducationProgramResponse> = {
                    from: 0,
                    index: 0,
                    size: newFilteredItems.length,
                    count: newFilteredItems.length,
                    pages: 1,
                    items: newFilteredItems,
                    hasPrevious: false,
                    hasNext: false,
                };
                setEducationPrograms(filteredItems);
            } else {
                getEducationPrograms();
            }
        }
    }
    const pages = [];

    if (educationPrograms?.pages)
        for (let pageIndex = 0; pageIndex < educationPrograms?.pages; pageIndex++) {
            pages.push(
                <Pagination.Item onClick={() => changePageIndex(pageIndex)} key={pageIndex} active={pageIndex === pageIndexState}> {pageIndex + 1} </Pagination.Item>
            );
        }

    return (
        <div className={authState.isAuthenticated && lastPathSegment?.includes("platform-katalog") ? "bg-front-white" : "bg-front-dark"}>
            <div className="catalog-page">
                <div className='container'>
                    <div className="row">
                        <div className="col-md-9 catalog-search">
                            <h1>Öğrenmeye başla!</h1>
                            <div className="input-container">
                                <input type="text" id="search" onChange={(event) => handleInputFilter(event)} placeholder="Eğitim arayın..." />
                                <IoSearch className="search-icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <CatalogFilter onDataFromChild={handleDataFromChild} />
                    </div>
                    <div className="col md-9 catalog-page-content" >
                        {educationPrograms?.items && educationPrograms.items.length > 0 ? (
                            educationPrograms.items.map((educationProgram) => (
                                <CatalogCard
                                    key={educationProgram.id}
                                    name={educationProgram.name}
                                    thumbnailPath={educationProgram.thumbnailPath}
                                    duration={educationProgram.duration}
                                    authorizedPerson={educationProgram.authorizedPerson}
                                    id={educationProgram.id}
                                />
                            ))
                        ) : (
                            <div className="no-result-message" style={{ color: lastPathSegment?.includes("platform-katalog") ? "rgb(40, 40, 40)" : "rgb(148, 148, 148)" }}>
                                Aradığınız kriterlere uygun içerik bulunamadı.
                            </div>
                        )}
                        <Col className="pagination-area" md={12}>
                            <Pagination style={{ display: educationPrograms && educationPrograms.pages > 1 ? 'flex' : 'none' }}>
                                <Pagination.Prev className="pagination-prev-next" disabled={pageIndexState === 0} onClick={() => changePageIndex(pageIndexState - 1)} >
                                    <span aria-hidden="true"> &lt; </span>
                                </Pagination.Prev>
                                {pages}
                                <Pagination.Next className="pagination-prev-next" disabled={pageIndexState + 1 === educationPrograms?.pages} onClick={() => changePageIndex(pageIndexState + 1)}>
                                    <span aria-hidden="true"> &gt; </span>
                                </Pagination.Next>
                            </Pagination>
                        </Col>
                    </div>
                </div>
            </div>
        </div>
    );
}
