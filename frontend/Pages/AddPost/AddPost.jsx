import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import styles from "./AddPost.module.scss";
import { Container, Button, Paper, TextField } from "@mui/material";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { selectorIsAuth } from "../../redux/Slice/auth";
import axios from "../../axios/axios";

const AddPost = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const isAuth = useSelector(selectorIsAuth);

  // const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const inputRef = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const isRed = (id) => {
    if (id) {
      return true;
    }
    return false;
  };
  console.log(isRed(id));

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChange = useCallback((text) => {
    setText(text);
  });

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        tags,
        text,
        imageUrl,
      };

      const { data } = isRed(id)
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);
      const _id = isRed(id) ? id : data._id;
      navigate(`/ANCS/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert(`${err}`);
    }
  };

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/ANCS/" />;
  }

  useEffect(() => {
    if (id) {
      axios
        .get(`/posts/${id}`)
        .then((res) => {
          setText(res.data.text),
            setImageUrl(res.data.imageUrl),
            setTags(res.data.tags),
            setTitle(res.data.title);
        })
        .catch((err) => console.warn(err));
    }
  }, []);

  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => {
          inputRef.current.click();
        }}
        variant="outlined"
        size="large"
      >
        Загрузить превью
      </Button>
      <input type="file" onChange={handleChangeFile} hidden ref={inputRef} />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:4444${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isRed(id) ? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to="/ANCS/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default AddPost;
