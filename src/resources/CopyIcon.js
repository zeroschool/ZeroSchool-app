import { IconButton } from "@material-ui/core";
import FilterNoneIcon from "@material-ui/icons/FilterNone";

export default function CopyIcon(props) {
  const url = `https://zeroschool.org/t/${props.tx}`;
  const handleClick = (e) => {
    e.stopPropagation();
    const el = document.createElement("textarea");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    alert("copied to clipboard");
  };

  return (
    <IconButton onClick={handleClick}>
      <FilterNoneIcon />
    </IconButton>
  );
}
