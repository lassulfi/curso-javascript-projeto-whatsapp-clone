class WhatsAppController {
    constructor() {
        console.log('Hello! WhatsApp!');
        this.elementsPrototype();
        this.loadElements();
        this.initEvents();
    }

    elementsPrototype(){
        Element.prototype.hide = function() {
            this.style.display = 'none';
            
            return this;
        }

        Element.prototype.show = function() {
            this.style.display = 'block';
            
            return this;
        }

        Element.prototype.toggle = function() {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            
            return this;
        }

        Element.prototype.on = function(events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
            
            return this;
        }

        Element.prototype.css = function(styles) {
            for(let name in styles) {
                this.style[name] = styles[name];
            }

            return this;
        }

        Element.prototype.addClass = function(name) {
            this.classList.add(name);

            return this;
        }

        Element.prototype.removeClass = function(name) {
            this.classList.remove(name);

            return this;
        }

        Element.prototype.containClass = function(name) {
            return this.classList.contains(name);
        }
    }

    loadElements() {
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });
    }

    initEvents() {
        this.el.myPhoto.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 400);
        });

        this.el.btnNewContact.on('click', e => {
            this.closeAllLeftPanels();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 400);
        });

        this.el.btnClosePanelEditProfile.on('click', e => {
            this.el.panelEditProfile.removeClass('open');
        })

        this.el.btnClosePanelAddContact.on('click', e => {
            this.el.panelAddContact.removeClass('open');
        })
    }

    closeAllLeftPanels(){
        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();
    }
}