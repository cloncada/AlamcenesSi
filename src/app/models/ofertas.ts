import { Deal } from './deals';
import { Department } from './departments';
import { Category } from './categories';
import { Subcategory } from './subcategories';
import { Group } from './groups';
import { Ean } from './eans';

export class Oferta {
    deal :  Deal;
    department :  Department;
    group : Group;
    category :  Category;
    subcategory :  Subcategory;

    id?: string;
    idOferta?: string;
    codigoEventoOferta?: string;
    nombreOferta?: string;
    codigoComprador?: string;
    fechaFin?: string;
    fechaInicio?: string;
    aplicarHorario?: boolean;
    codigoMedioPago?: string;
    codigosSucursales?: string;
    codigoTipoOferta?: string;
    valorTipoOferta?: number;
    tipoVentaja?: string;
    codigoProveedor?: string;
    codigoFormaPagoProveedor?: string;
    cobroProveedor?: string;
    participacionAsumirNegocio?: number;
    participacionAsumirProveedor?: number;
    unidadesDisponibles?: number;
    codigoPlazoCredito?: string;
    descripcionMecanicaOferta?: string;
    codigoTipoPuntoCompra?: string;
    textoPuntoCompra?: string;
    textoLegal?: string;
    observaciones?: string;
    codigoMarca?: string;
    totalVentaDescuentos?: number;
    totalVentaUnidades?: number;
    estatus?: string;
    eans ?: Ean [] = [];
    ecommerceProcesado?: boolean;
    popProcesado?: boolean;

    codigoNegocio?: string;
    codigoDepartamento?: string;
    codigoGrupo?: string;
    codigoCategoria?: string;
    codigoSubcategoria?: string;

}