import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { PREDEFINED_COLORS } from "../../utils/const";
import { RGBToSaturation } from "../../utils/helpers";
import { hexToRgb, RGBToHex } from "../../utils/helpers";
import { TypeSubmit, TypeFormVal } from "../../types";
import Secondform from "../secondForm";
const getDatafromLS = () => {
  const data = localStorage.getItem("colors");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const Firstform: FC = () => {
  const [formValues, setFormValues] = useState<TypeFormVal>({ text: "" });
  const [formErrors, setFormErrors] = useState("");
  const [opt, setOpt] = useState("list");
  const [colorList, setColorList] = useState<TypeSubmit[]>(PREDEFINED_COLORS);
  const [title, setTitle] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormValues({ ...formValues, [name]: value });
    setTitle(value);
  };
  //form submission handler
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    if (validate(formValues)) {
      const [red, green, blue] = formValues.text.split(",");
      const isHex = formValues.text.includes("#");
      const parsRed = parseInt(red);
      const parsGreen = parseInt(green);
      const parsBlue = parseInt(blue);
      let color: TypeSubmit = {
        id: new Date().getTime().toString(),
        isRemovable: true,
        isHex,
        red: parsRed,
        green: parsGreen,
        blue: parsBlue,
        nameHex: RGBToHex(parsRed, parsGreen, parsBlue),
      };
      if (isHex) {
        color.nameHex = formValues.text;
        const { red, green, blue } = hexToRgb(formValues.text);
        color.red = red;
        color.green = green;
        color.blue = blue;
      }
      const newColorList = [...colorList, color];
      const newUserColorList = newColorList.filter(
        (color) => color.isRemovable
      );
      setColorList(newColorList);
      localStorage.setItem("colors", JSON.stringify(newUserColorList));
      setTitle("");
    }
  };
  useEffect(() => {
    setColorList([...colorList, ...getDatafromLS()]);
    // eslint-disable-next-line
  }, []);

  //form validation
  const validate = (values: TypeFormVal) => {
    let errors = "";
    const regex =
      /^#+([0-9A-F]{6}|[0-9A-F]{3})$|^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;
    if (!values.text) {
      errors = "Cannot be blank";
    } else if (!regex.test(values.text)) {
      errors =
        "Only RGB or HEX format example: 125,125,125  format example: #001DAB";
    } else if (regex.test(values.text)) {
      return true;
    }
    setFormErrors(errors);
    return false;
  };

  // delete color from LS
  const deleteColor = (id: string) => {
    const filteredColors = colorList.filter((element, index) => {
      return element.id !== id;
    });
    const newUserColorList = filteredColors.filter(
      (color) => color.isRemovable
    );
    setColorList(filteredColors);
    localStorage.setItem("colors", JSON.stringify(newUserColorList));
  };

  useEffect(() => {
    var elem = document.querySelectorAll(
      ".list__rectangle"
    ) as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < elem.length; i++) {
      elem[i].style.backgroundColor = elem[i].getAttribute("data-color") || "";
    }
  }, [opt, colorList, colorList.length]);

  return (
    <div className="wrapper">
      <div className="wrapper__form">
        <form className="form" onSubmit={onSubmit}>
          <label>color</label>
          <select value={opt} onChange={(e) => setOpt(e.target.value)}>
            <option value="list"> all</option>
            <option value="red50"> red &gt; 127</option>
            <option value="green50"> green &gt; 127</option>
            <option value="blue50"> blue &gt; 127</option>
            <option value="Sat50"> Saturation &gt; 50%</option>
          </select>
          <label htmlFor="text">color</label>
          <Secondform title={title} handleChange={handleChange} />
          <button type="submit">add color</button>
          {formErrors && <div className="error">{formErrors}</div>}
        </form>
      </div>
      <div className="wrapper__form">
        <p>List length: {colorList.length}</p>
        {colorList
          .filter((color) => {
            if (opt === "list") return true;
            else if (opt === "red50") {
              return color.red > 127;
            } else if (opt === "green50") {
              return color.green > 127;
            } else if (opt === "blue50") {
              return color.blue > 127;
            } else if (opt === "Sat50") {
              const saturation = RGBToSaturation(
                color.red,
                color.green,
                color.blue
              );
              return saturation > 50;
            }
            return true;
          })
          .sort((a, b) => {
            if (b.red === a.red) {
              if (b.green === a.green) {
                return b.blue - a.blue;
              }
              return b.green - a.green;
            }
            return b.red - a.red;
          })
          .map((color, index) => {
            return (
              <div className="list" key={index}>
                <div
                  data-color={
                    color.isHex
                      ? color.nameHex
                      : `rgb(${color.red},${color.green},${color.blue})`
                  }
                  className="list__rectangle"
                ></div>
                <div className="list__rectangleDescr">
                  HEX:{color.nameHex}, RGB({color.red}, {color.green},{" "}
                  {color.blue})
                </div>
                {color.isRemovable && (
                  <button onClick={() => deleteColor(color.id)}>delete</button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Firstform;
