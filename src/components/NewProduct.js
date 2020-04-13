import React, { useState } from "react";
// prettier-ignore
import { Form, Button, Input, Notification, Radio, Progress } from "element-react";

import awsmobile from "../aws-exports";

// import  as aws_exports from "../aws-exports";

import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import { createProduct } from "../graphql/mutations";
import { PhotoPicker } from "aws-amplify-react";
import { convertDollarsToCents } from "../utils";

function NewProduct({ marketId }) {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isShipped, setIsShipped] = useState(true);
  const [price, setPrice] = useState("");

  const [isUploading, setIsUploading] = useState(false);

  const handleAddProduct = async () => {
    try {
      setIsUploading(true);

      const visibility = "public";
      const { identityId } = await Auth.currentCredentials();
      const filename = `/${visibility}/${identityId}/${Date.now()}-${
        image.name
      }`;

      const uploadedFile = await Storage.put(filename, image.file, {
        contentType: image.type
      });

      const file = {
        key: uploadedFile.key,
        bucket: awsmobile.aws_user_files_s3_bucket,
        region: awsmobile.aws_user_files_s3_bucket_region
      };

      const input = {
        productMarketId: marketId,
        description,
        shipped: isShipped,
        price: convertDollarsToCents(price),
        file
      };

      const result = await API.graphql(
        graphqlOperation(createProduct, { input })
      );

      console.log("result: ", result);
      console.log("------------------------------------------");

      Notification({
        title: "Success",
        message: "Product successfuly created.",
        type: "success"
      });

      setDescription("");
      setImage("");
      setImagePreview(null);
      setIsShipped(true);
      setPrice("");
    } catch (error) {
      console.error("Error adding product: ", error);
    }
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
            disabled={!image || !description || !price || isUploading}
            type="primary"
            loading={isUploading}
            onClick={handleAddProduct}
          >
            {isUploading ? "Uploading ..." : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default NewProduct;
