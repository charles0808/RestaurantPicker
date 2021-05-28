import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  ListGroup,
  Form,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import AsyncSelect from "react-select/async";
import "./RandomPicker.css";
const _ = require("lodash");

const dummyData = [
  {
    name: "兰州拉面",
    tag: ["面"],
    url: "https://www.39miles.com/p/08466044",
  },
  {
    name: "Chick n Tea",
    tag: ["炸鸡", "快餐"],
    url: "https://www.39miles.com/p/08466044",
  },
  {
    name: "麦麦",
    tag: ["快餐"],
    url: "https://www.39miles.com/p/08466044",
  },
  {
    name: "麻辣香锅",
    tag: ["辣"],
    url: "https://www.39miles.com/p/08466044",
  },
];

const RandomPicker = () => {
  const [restaurant, setRestaurant] = useState();
  const [resList, setResList] = useState(dummyData);
  const [filterOption, setFilterOption] = useState([]);
  const [name, setName] = useState();
  const [url, setUrl] = useState();
  const [feature, setFeature] = useState();
  const [featureList, setFeatureList] = useState([]);

  useEffect(() => {
    let temp = [];
    for (const d of dummyData) {
      temp = _.union(temp, d.tag);
    }
    let result = [];
    for (const t of temp) {
      result.push({ value: t, label: t });
    }

    setFilterOption(result);
  }, []);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const randomOnClickHandler = () => {
    let index = getRandomInt(resList.length);
    setRestaurant(resList[index]);
  };

  const filterOnChangeHandler = (e) => {
    if (e.length === 0) {
      setResList(dummyData);
    } else {
      let temp = dummyData.filter((r) => {
        let condition = true;
        for (const f of e) {
          if (!r.tag.includes(f.value)) {
            condition = false;
          }
        }
        if (condition) {
          return r;
        }
        return;
      });

      console.log(temp);

      setResList(temp);
    }
  };

  const filterColors = (inputValue) => {
    return filterOption.filter((i) => i.label.includes(inputValue));
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const addFeatureHandler = (e) => {
    let temp = [...featureList];
    console.log(temp);
    temp.push(feature);
    setFeature("")
    setFeatureList(temp);
  };

  const addRestaurantHandler = (e) => {
    e.preventDefault();
    let rest = {
      name: name,
      tag: featureList,
      url: url,
    };

    let temp = [...dummyData];
    temp.push(rest);
    console.log(temp);
    setResList(temp);
  };

  return (
    <div>
      <Row>
        <Col>
          <div className="edit-restaurant">
            {filterOption.length > 0 ? (
              <AsyncSelect
                cacheOptions
                defaultOptions
                loadOptions={promiseOptions}
                isMulti
                onChange={filterOnChangeHandler}
              />
            ) : (
              ""
            )}

            <ListGroup style={{ marginTop: "50px" }}>
              {resList.map((r, index) => {
                return <ListGroup.Item key={index}>{r.name}</ListGroup.Item>;
              })}
            </ListGroup>
          </div>
        </Col>
        <Col xs={6}>
          <p>今天吃什么呀</p>
          <div className="placeholder">
            <div className="res-info">
              <div>
                {restaurant ? (
                  <div>
                    今天吃: {restaurant.name} <br />{" "}
                    <a href={restaurant.url}>点餐网站</a>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <Button
                className="select-button"
                onClick={randomOnClickHandler}
                style={{ marginTop: "30px" }}
              >
                大鸟转转转
              </Button>
            </div>
          </div>
        </Col>
        <Col>
          <div className="add-restaurant">
            <Form onSubmit={addRestaurantHandler}>
              <Form.Group>
                <Form.Label>Restaurant name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter restaurant name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Order website</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="full url here, start with http"
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </Form.Group>

              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Restaurant feature"
                  aria-label="Restaurant feature"
                  value={feature}
                  onChange={(e) => setFeature(e.target.value)}
                  required
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-secondary"
                    onClick={addFeatureHandler}
                  >
                    Add feature
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              {featureList.length > 0 ? <ul>{featureList.map(f => <li>{f}</li>)}</ul> : ""}
              <Button
                variant="primary"
                type="submit"
              >
                Add Restaurant
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RandomPicker;
