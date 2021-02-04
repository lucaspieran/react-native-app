import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Button, Alert, _ScrollView, ScrollView } from 'react-native';
import Cita from './Cita';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';


const Formulario = ({ citas, setCitas, guardarMostrarForm }) => {

    const [paciente, guardarPaciente] = useState('')
    const [propietario, guardarPropietario] = useState('')
    const [telefono, guardarTelefono] = useState('')
    const [fecha, guardarFecha] = useState('')
    const [hora, guardarHora] = useState('')
    const [sintomas, guardarSintomas] = useState('')


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDataPicker = () => {
        setDatePickerVisibility(false)
    }

    const confirmarFecha = date => {
        const opciones = { year: 'numeric', month: 'long', day: '2-digit' }
        guardarFecha(date.toLocaleDateString('es-ES', opciones));

        hideDataPicker()

    };

    //time 
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false)
    }


    const confirmarHora = hora => {
        const opciones = { hour: 'numeric', minute: '2-digit', hour12: false };
        guardarHora(hora.toLocaleString('es-ES', opciones))
        hideTimePicker()
    };

    //crear nueva cita

    const crearNuevaCita = () => {
        //validar 
        if (paciente.trim() === '' || propietario.trim() === '' || telefono.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            mostrarAlerta();
            return
        }
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };

        cita.id = shortid.generate();



        const citasNuevo = [...citas, cita]
        setCitas(citasNuevo)

        //ocultar el form   
        guardarMostrarForm(false)


        //reset

    }

    //muestra la alerta
    const mostrarAlerta = () => {
        Alert.alert(
            'Error',
            'Todos los campos son obligatorios',
            [{
                text: "OK"
            }]
        )
    }

    return (

        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPaciente(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarPropietario(texto)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Telefono Contacto:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={texto => guardarTelefono(texto)}
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.label}>Fecha: </Text>
                <View>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                    />
                    <Text> {fecha}</Text>
                </View>
                <Text style={styles.label}>Hora: </Text>
                <View>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDataPicker}
                        locale='es_ES'
                    />
                    <Text> {hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sintomas:</Text>
                    <TextInput
                        multiline
                        style={styles.input}
                        onChangeText={texto => guardarSintomas(texto)}
                    />
                </View>

                <View>
                    <TouchableHighlight style={styles.btnSubmit} onPress={() => crearNuevaCita()}>
                        <Text style={styles.textoSubmit}>Crear Nuevo </Text>
                    </TouchableHighlight>
                </View>

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 20
    },
    input: {

        marginTop: 10,
        height: 50,
        borderColor: "#e1e1e1",
        borderWidth: 1,
        borderStyle: "solid"
    },
    formulario: {
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: "2.5%"
    },
    btnSubmit: {
        padding: 10,
        backgroundColor: "#7d024e",
        marginVertical: 10,
        marginBottom:20
    },
    textoSubmit: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        
    }
})

export default Formulario;