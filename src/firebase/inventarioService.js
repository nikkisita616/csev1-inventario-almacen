import {
    addDoc, collection, deleteDoc, doc,
    onSnapshot, orderBy, query, updateDoc,
} from "firebase/firestore"

import { db } from "./config" 

const productosRef = collection(db, "productos")

export const obtenerProductos = (callback) => {
    const q = query(productosRef, orderBy("creadoEn", "desc"))
    return onSnapshot(q, (snapshot) => {
        const productos = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
        }))
        callback(productos)
    })
}

export const crearProducto = (valores) => {
    return addDoc(productosRef, { ...valores, creadoEn: Date.now() })
}

export const actualizarProducto = (id, valores) => {
    const productoDoc = doc(db, "productos", id)
    return updateDoc(productoDoc, { ...valores })
}

export const eliminarProducto = (id) => {
    const productoDoc = doc(db, "productos", id)
    return deleteDoc(productoDoc)
}