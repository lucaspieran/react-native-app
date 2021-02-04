import React, { useState } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './components/Cita';
import Formulario from './components/Formulario';

export default function App() {
  const [mostrarForm, guardarMostrarForm] = useState(false);

  const [citas, setCitas] = useState([ ]);

  //Elimina los pacientes del state
  const eliminarPaciente = (id) => {
    setCitas((citasActuales) => {
      return citasActuales.filter(cita => cita.id !== id)
    })
  }

  //muestra el form
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado=()=> {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={()=> cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de Turnos</Text>
        <View>
          <TouchableHighlight style={styles.btnMostrarForm} onPress={() => mostrarFormulario()}>
            <Text style={styles.textoMostrarForm}>{mostrarForm ? "Cancelar Crear Turno" : "Crear Nuevo Turno"}</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear nuevo Turno</Text>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />

            </>
          ) : (
              <>
                <Text style={styles.titulo2}>{citas.length > 0 ? "Administra Tus Turnos" : "No hay citas, agrega una"}</Text>
                <FlatList
                  style={styles.listado}
                  data={citas}
                  renderItem={({ item }) => (<Cita item={item} eliminarPaciente={eliminarPaciente} />)}
                  keyExtractor={cita => cita.id}
                />
              </>
            )}



        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 40,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 20
  },
  contenido: {
    flex: 1,
    marginHorizontal: "2.54%"
  },
  listado: {
    flex: 1
  },
  btnMostrarForm: {
    padding: 10,
    backgroundColor: "#7d024e",
    marginVertical: 10
  },
  textoMostrarForm: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  titulo2: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 20
  }
})

