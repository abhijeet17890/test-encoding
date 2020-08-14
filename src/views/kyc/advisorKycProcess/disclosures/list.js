import React from "react";
import { List } from "antd";

import { advisorDisclosures } from "../../constants/disclosures";

import { CustomList } from "./style";

const DisclosuresList = () => {
  return (
    <CustomList
      itemLayout="horizontal"
      dataSource={advisorDisclosures}
      renderItem={(item, index) => (
        <List.Item>
          <List.Item.Meta
            title={
              <React.Fragment>
                <span>{index + 1}.</span>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.title}
                </a>
              </React.Fragment>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default DisclosuresList;
