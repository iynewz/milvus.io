import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";
import LocalizedLink from "../components/localizedLink/localizedLink";
import "../scss/gui.scss";
import feature1 from "../images/admin/feature1.png";
import feature2 from "../images/admin/feature2.png";
import feature3 from "../images/admin/feature3.png";

const GuiPage = ({ data, pageContext }) => {
  const language = data.allFile.edges[0].node.childLayoutJson.layout;
  const { locale } = pageContext;
  const { section1, section2, section3, section4 } = language.gui;

  const [screenWidth, setScreenWidth] = useState(null);
  useEffect(() => {
    const cb = () => {
      setScreenWidth(document.body.clientWidth);
    };
    cb();
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, []);
  return (
    <Layout language={language} locale={locale}>
      <SEO title="Milvus GUI" />
      <main className="gui-wrapper">
        <section className="section1">
          <h2>{section1.title}</h2>
          <p>{section1.desc}</p>
          <div className="btn-wrapper">
            <LocalizedLink
              className="primary white-color"
              to="/docs/Milvus%20Admin/admin_operations.md"
              locale={locale}
            >
              {section1.link}
            </LocalizedLink>
          </div>
        </section>
        <section className="section4">
          <div className="item">
            <img src={feature1} alt="similarity search in gui"></img>
            <div className="desc-wrapper">
              <h2>{section4.feature1.title}</h2>
              <p>{section4.feature1.desc1}</p>
            </div>
          </div>
          {screenWidth <= 1000 ? (
            <div className="item">
              <img src={feature2} alt="similarity search in gui"></img>

              <div className="desc-wrapper">
                <h2>{section4.feature2.title}</h2>
                <p>{section4.feature2.desc1}</p>
                <p>{section4.feature2.desc2}</p>
              </div>
            </div>
          ) : (
            <div className="item">
              <div className="desc-wrapper right-margin">
                <h2>{section4.feature2.title}</h2>
                <p>{section4.feature2.desc1}</p>
                <p>{section4.feature2.desc2}</p>
              </div>
              <img src={feature2} alt="similarity search in gui"></img>
            </div>
          )}

          <div className="item">
            <img src={feature3} alt="similarity search in gui"></img>
            <div className="desc-wrapper">
              <h2>{section4.feature3.title}</h2>
              <p>{section4.feature3.desc1}</p>
            </div>
          </div>
        </section>
        <section className="section3">
          <h2>{section3.title}</h2>
          <div className="docker-code">
            <p>docker pull milvusdb/milvus-admin:latest</p>
            <p>docker run -p 3000:80 milvusdb/milvus-admin:latest</p>
          </div>
          <p>{section3.desc} http://localhost:3000/</p>
          <LocalizedLink
            className="primary primary-color btn"
            to="/docs/Milvus%20Admin/admin_operations.md"
            locale={locale}
          >
            {section3.help}
          </LocalizedLink>
        </section>
      </main>
    </Layout>
  );
};

export const Query = graphql`
  query GuiQuery($locale: String) {
    allFile(filter: { name: { eq: $locale } }) {
      edges {
        node {
          childLayoutJson {
            layout {
              notFound
              header {
                quick
                benchmarks
                why
                gui
                solution
                about
                doc
                blog
                try
                loading
                noresult
                tutorial
              }
              footer {
                product {
                  title
                  txt1
                  txt2
                }
                doc {
                  title
                  txt1
                  txt2
                  txt3
                }
                tool {
                  title
                  txt1
                }
                resource {
                  title
                  txt1
                  txt2
                  txt3
                  txt4
                }
                contact {
                  title
                  wechat
                }
              }

              gui {
                section1 {
                  title
                  desc
                  link
                }
                section2 {
                  desc1
                  desc2
                  desc3
                }
                section3 {
                  title
                  desc
                  help
                }
                section4 {
                  feature1 {
                    title
                    desc1
                  }
                  feature2 {
                    title
                    desc1
                    desc2
                  }
                  feature3 {
                    title
                    desc1
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default GuiPage;
