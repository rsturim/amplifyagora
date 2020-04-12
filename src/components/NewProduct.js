import React, { useState } from "react";
// prettier-ignore
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

import { PhotoPicker } from "aws-amplify-react";

function NewProduct() {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isShipped, setIsShipped] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState("");

  const handleAddProduct = () => {
    console.log("console added");
    console.log(NewProduct);

    setPrice("");
    setIsShipped(true);
    setImagePreview(null);
    setImage("");
    setDescription("");
  };

  return (
    <div className="flex-center">
      <h2 className="header">Add New Product</h2>
      <Form className="market-header">
        <Form.Item label="Add Product Description">
          <Input
            label="Add Product Description"
            type="text"
            icon="information"
            placeholder="Description"
            onChange={description => setDescription(description)}
            value={description}
          />
        </Form.Item>
        <Form.Item label="Set Product Price">
          <Input
            type="number"
            icon="plus"
            placeholder="Price ($USD)"
            onChange={price => setPrice(price)}
            value={price}
          />
        </Form.Item>

        <Form.Item label="Is the Product Shipped or Emailed to the Customer?">
          <div className="text-center">
            <Radio
              value="true"
              checked={isShipped === true}
              onChange={() => setIsShipped(true)}
            >
              Shipped
            </Radio>
            <Radio
              value="false"
              checked={isShipped === false}
              onChange={() => setIsShipped(false)}
            >
              Emailed
            </Radio>
          </div>
        </Form.Item>
        {imagePreview && (
          <img
            className="image-preview"
            src={imagePreview}
            alt="Product Preview"
          />
        )}
        <PhotoPicker
          title="Product Image"
          preview="hidden"
          onLoad={url => setImagePreview(url)}
          theme={{
            formContainer: {
              margin: 0,
              padding: "0.8em"
            },
            sectionHeader: {
              padding: "0.2em",
              // border: "solid 1px red",
              color: "var(--darkAmazonOrange)"
            }
            // photoPickerButton: {
            //   display: "none"
            // }
          }}
          onPick={data => setImage(data)}
        />

        <Form.Item>
          <Button
            type="primary"
            onClick={handleAddProduct}
            disabled={!image || !description || !price}
          >
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewProduct;
