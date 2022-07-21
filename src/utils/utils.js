export const productOption = (props) => {
  if (Object.keys(props.option_groups).length > 0) {
    const optionObj = {};
    props.option_groups.reduce((pre, item) => {
      if (item.title === "색상") {
        optionObj.color = item.label;
        optionObj.colorCode = item.value;
      } else if (item.title === "용량") {
        optionObj.capacity = item.label;
      } else if (item.title === "품질") {
        optionObj.quality = item.label;
      } else if (item.title === "케이블") {
        optionObj.cable = item.value;
      } else if (item.title === "어댑터") {
        optionObj.adapter = item.value;
      } else if (item.title === "오리지널박스") {
        optionObj.box = item.value;
      }
      return pre;
    }, []);

    return optionObj;
  }
};
