import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Collapse, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import CelebCard from "./components/CelebCard";

const { Panel } = Collapse;

const ListOfCelebrities = () => {
  const dispatch = useDispatch();
  const celebrityData = useSelector((state) => state.celebrityData);
  const [enable, setEnable] = useState(false);
  const [userToBeEdited, setUserToBeEdited] = useState();
  const [dataForCelebrity, setDataForCelebrity] = useState([]);
  const [isDataSet, setIsDataSet] = useState(false);
  const [userName, setUserName] = useState();
  useEffect(() => {
    dispatch({ type: "LOAD_CELEBRITY_DATA" });
  }, []);

  useEffect(() => {
    if (celebrityData && celebrityData.length > 0) {
      setDataForCelebrity(celebrityData);
    }
  }, [celebrityData]);

  useEffect(() => {
    if (isDataSet) {
        setIsDataSet(false);
    }
  }, [isDataSet])

  const handleUserName = (value, id) => {
    setEnable(value);
    setUserToBeEdited(id);
  };

  const handleCelebrityName = (e, id) => {
    dataForCelebrity &&
      dataForCelebrity.length > 0 &&
      dataForCelebrity.forEach((data) => {
        if (data.id === id) {
          data.name = e.target.value;
        }
      });
    //   setUserName(e.target.value)
      dispatch({ type: "UPDATE_NAME", data: {
        id: id,
        name: e.target.value
      } });
    if (!enable) {
      setDataForCelebrity(dataForCelebrity);
    }
  };

  const handleDeleteUser = (id) => {
    const fileteredCelebrity = dataForCelebrity && dataForCelebrity.length > 0 && dataForCelebrity.filter(celeb => celeb.id !== id);
    fileteredCelebrity && fileteredCelebrity.length > 0 && setDataForCelebrity(fileteredCelebrity);  
  }

  const handleUserSearch = (e) => {
    const filteredCelebs = e.target.value !== '' ? celebrityData && celebrityData.length > 0 && celebrityData.filter(celeb => celeb.name.toLowerCase().includes(e.target.value.toLowerCase())) : [];
    filteredCelebs && filteredCelebs.length > 0 && setDataForCelebrity(filteredCelebs);
    e.target.value === '' && setDataForCelebrity(celebrityData);
  }

  console.log("json", dataForCelebrity);
  return (
    <div>
      <Input
        placeholder="Search User"
        size="large"
        prefix={<SearchOutlined />}
        onChange={handleUserSearch}
        // style={{ width: "520px" }}
      />
      <br/>
      <br/>
      <Collapse
        defaultActiveKey={["1"]}
        // onChange={onChange}
        expandIconPosition={"end"}
        collapsible={!enable ? "icon" : 'disabled'}
        style={{ width: '500px'}}
      >
        {dataForCelebrity &&
          dataForCelebrity.length > 0 &&
          dataForCelebrity.map((celeb) => {
            return (
              <React.Fragment key={`${celeb.id} ${celeb.first}`}>
              <Panel
                header={
                  <>
                    <img src={celeb.picture} className="celebImage" />{" "}
                    {!enable ? (
                      <strong>{celeb.name}</strong>
                    ) : userToBeEdited === celeb.id ? (
                      <Input
                        size="small"
                        placeholder="Basic usage"
                        defaultValue={celeb.name}
                        onChange={(e) => handleCelebrityName(e, celeb.id)}
                        style={{ width: "120px" }}
                      />
                    ) : (
                      <strong>{celeb.name}</strong>
                    )}
                  </>
                }
                key={`${celeb.id} ${celeb.name}`}
              >
                <CelebCard celeb={celeb} userName={userName} onHandleUserName={handleUserName} onHandleDeleteConfirmation={handleDeleteUser} />
              </Panel>
              <br key={celeb.id}/>
              {/* <br/> */}
              </React.Fragment>
            );
          })}
      </Collapse>
    </div>
  );
};

export default ListOfCelebrities;
