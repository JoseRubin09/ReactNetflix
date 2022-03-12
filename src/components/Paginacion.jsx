import { useSearchParams } from "react-router-dom";
import styles from "./paginacion.module.css"


function Paginacion(props) {
    const [query, setQuery] = useSearchParams();
    const page = query.get("page");
    const search = query.get("search")
    const text = props.paso === 1 ? "Siguiente página" : "Anterior página"

    const refreshPage = () => {
        setTimeout(() => {
            window.location.reload(false)
        }, 250);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setQuery({ search: search, page: (parseInt(page) + props.paso) })
        refreshPage()
    }
    return (
        <form onSubmit={handleSubmit} className={styles.botonConteiner}>
            <button type="submit" className={styles.boton}>{text}</button>
        </form>
    )
}

export default Paginacion;