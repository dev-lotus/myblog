import Map from "../Map/Map";
import "./Home.css";

function Home() {
    return (
        <section className="container-fluid ">
            <div className="row">
                <div className="col-lg-5 col-md-12 col-12 ">
                    <Map />
                </div>
                <div className="col-lg-7 col-md-12 col-12 py-3 listings ">
                    <ul className="nav nav-tabs" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="pills-free-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-free" type="button" role="tab" aria-controls="pills-free"
                                aria-selected="true"><span className="fs-5 fw-bold">Free</span></button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-borrow-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-borrow" type="button" role="tab" aria-controls="pills-borrow"
                                aria-selected="false"><span className=" fs-5 fw-bold">Borrow</span> </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="pills-wanted-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-wanted" type="button" role="tab" aria-controls="pills-wanted"
                                aria-selected="false"><span className="fs-5 fw-bold">Wanted</span></button>
                        </li>
                    </ul>
                    <div className="tab-content bg-white p-lg-2 p-2" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-free" role="tabpanel"
                            aria-labelledby="pills-free-tab">
                            <p className="fs-5">Our journey started way back 6 years ago when we started struggling with Podio, and Podio also kept pace with the advancement in technology.</p>
                            <p className="fs-5">What we discovered at every milestone is to deliver the client the best in class service so that the client never calls us back for any bugs. Today we have reached out to more than 80+ Active clients who asked for Podio customization, with 250+ successful jobs done in just the last 2 years.</p>
                        </div>
                        <div className="tab-pane fade" id="pills-borrow" role="tabpanel"
                            aria-labelledby="pills-borrow-tab">
                            <div className="find-out-more p-3">
                                <h4 className="fw-bold">What's Borrow ?</h4>
                                <p className="">Why buy when you can borrow instead ? Here neighbours can lend & borrow everyday household items for free.</p>
                            </div>
                            <div className="list">
                                <div class="card my-2">
                                    <div class="row g-0">
                                        <div class="col-md-4 list-img">
                                            <img src="https://images.unsplash.com/photo-1657299171251-2a61ea716fbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8 my-auto">
                                            <div class="card-body">
                                                <h4 class="card-title fw-bold">Chicken Briyani</h4>
                                                <p>The href attribute requires a valid value to be accessible. </p>
                                                <p class="card-text "><span><img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" width={40} className="rounded-circle" /></span> Lotus Biswas </p>

                                                <p class="card-text"><span className=""><i class="fa fa-map-marker" aria-hidden="true"></i> 5.5 km</span>  <span class="badge bg-warning text-dark"><small>Last updated 3 mins ago</small></span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card my-2">
                                    <div class="row g-0">
                                        <div class="col-md-4 list-img">
                                            <img src="https://images.unsplash.com/photo-1657299171251-2a61ea716fbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8 my-auto">
                                            <div class="card-body">
                                                <h4 class="card-title fw-bold">Chicken Briyani</h4>
                                                <p>The href attribute requires a valid value to be accessible. </p>
                                                <p class="card-text "><span><img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" width={40} className="rounded-circle" /></span> Lotus Biswas </p>

                                                <p class="card-text"><span className=""><i class="fa fa-map-marker" aria-hidden="true"></i> 5.5 km</span>  <span class="badge bg-warning text-dark"><small>Last updated 3 mins ago</small></span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div class="card my-2">
                                    <div class="row g-0">
                                        <div class="col-md-4 list-img">
                                            <img src="https://images.unsplash.com/photo-1657299171251-2a61ea716fbf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" class="img-fluid rounded-start" alt="..." />
                                        </div>
                                        <div class="col-md-8 my-auto">
                                            <div class="card-body">
                                                <h4 class="card-title fw-bold">Chicken Briyani</h4>
                                                <p>The href attribute requires a valid value to be accessible. </p>
                                                <p class="card-text "><span><img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" width={40} className="rounded-circle" /></span> Lotus Biswas </p>

                                                <p class="card-text"><span className=""><i class="fa fa-map-marker" aria-hidden="true"></i> 5.5 km</span>  <span class="badge bg-warning text-dark"><small>Last updated 3 mins ago</small></span></p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>



                        </div>
                        <div className="tab-pane fade" id="pills-wanted" role="tabpanel"
                            aria-labelledby="pills-wanted-tab">
                            <div className="find-out-more">
                                <h4>What's Borrow ?</h4>
                                <p>Why buy when you can borrow instead ? Here neighbours can lend & borrow everyday household items for free.</p>
                            </div>    </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Home;