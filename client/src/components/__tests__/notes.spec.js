import Notes from '../Notes';
import React from "react";
import { render, mount } from "enzyme";
import { shallow } from "enzyme";

describe(Notes, () => {
    beforeAll(() => {
      class LocalStorageMock {
        constructor() {
          this.store = {};
        }
      
        clear() {
          this.store = {};
        }
      
        getItem(key) {
          return this.store[key] || null;
        }
      
        setItem(key, value) {
          this.store[key] = String(value);
        }
      
        removeItem(key) {
          delete this.store[key];
        }
      }
      
      global.localStorage = new LocalStorageMock;
    });

  
    describe("Render", () => {      
        let notesWrapper;
        const note = {itle: "title",content: "content"};
        const notes = [note];
    
        beforeEach(() => {
          notesWrapper = shallow(<Notes />);
        });
    

        it("Titulo de notas correcto", () => {
          expect(notesWrapper.find("h3").at(0).text()).toBe(
            "Notas (sección privada)"
          );
        });

        it("Boton Añadir nota", () => {
          expect(notesWrapper.find("button").at(0).text()).toBe(
            "Añadir nota"
          );
        });
  })
    
});
