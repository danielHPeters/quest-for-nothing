/**
 * Experimental 3D Mesh implementation for future use.
 *
 * @author Daniel Peters
 * @version 0.1
 */
export default class Mesh {
  /**
   * Constructor.
   *
   * @param vertices initial vertices
   * @param edges initial edges
   * @param faces initial faces
   * @param polygons initial polygons
   * @param surfaces initial surfaces
   */
  constructor (vertices, edges, faces, polygons, surfaces) {
    this.vertices = vertices
    this.edges = edges
    this.polygons = polygons
    this.surfaces = surfaces
  }
}
