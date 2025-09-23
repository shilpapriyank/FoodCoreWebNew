"use client";

import { useParams } from "next/navigation";
import React from "react";
import Layout from "../../../../../components/nt/layout/layout";
import CreatePasswordComponent from "@/components/nt/forgot-password/create-password.component";

const Page: React.FC = () => {
  const params = useParams();
  console.log("Params:", params);
  return (
    <>
      <Layout>
        <main>
          <section className="gift-cards mt-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7 col-md-10 col-12">
                  <div className="row align-items-center">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12 text-center">
                      <div className="card">
                        <div className="card-header">Create a New Password</div>
                        <div className="card-body py-3">
                          <div className="custom-icons">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.7 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z" /></svg>
                          </div>
                          <h3 className="orange-text">Create a New Password</h3>
                          <CreatePasswordComponent />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};
export default Page;
